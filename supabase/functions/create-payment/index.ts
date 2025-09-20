import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  itemType: 'course' | 'product';
  itemId: string;
  itemName: string;
  amount: number;
  customerName: string;
  customerEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user from request
    const authorization = req.headers.get('Authorization');
    if (!authorization) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    }

    const token = authorization.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    }

    const { itemType, itemId, itemName, amount, customerName, customerEmail }: PaymentRequest = await req.json();

    console.log('Creating payment for:', { itemType, itemId, itemName, amount, user: user.id });

    // Create Instamojo payment request
    const instamojoApiKey = Deno.env.get('INSTAMOJO_API_KEY');
    const instamojoAuthToken = Deno.env.get('INSTAMOJO_AUTH_TOKEN');

    if (!instamojoApiKey || !instamojoAuthToken) {
      console.error('Missing Instamojo credentials');
      return new Response('Payment service not configured', { status: 500, headers: corsHeaders });
    }

    const instamojoPayload = {
      purpose: `${itemName} - Dance Planet`,
      amount: amount.toString(),
      phone: '',
      buyer_name: customerName,
      redirect_url: `${req.headers.get('origin')}/payment-success`,
      send_email: true,
      email: customerEmail,
      allow_repeated_payments: false,
    };

    console.log('Instamojo payload:', instamojoPayload);

    const instamojoResponse = await fetch('https://test.instamojo.com/api/1.1/payment-requests/', {
      method: 'POST',
      headers: {
        'X-Api-Key': instamojoApiKey,
        'X-Auth-Token': instamojoAuthToken,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(instamojoPayload).toString(),
    });

    const instamojoData = await instamojoResponse.json();
    console.log('Instamojo response:', instamojoData);

    if (!instamojoResponse.ok || !instamojoData.success) {
      console.error('Instamojo error:', instamojoData);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment link', details: instamojoData }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paymentRequest = instamojoData.payment_request;

    // Store order in database
    const { data: order, error: dbError } = await supabaseClient
      .from('orders')
      .insert({
        user_id: user.id,
        item_type: itemType,
        item_id: itemId,
        item_name: itemName,
        amount: amount,
        currency: 'INR',
        instamojo_payment_request_id: paymentRequest.id,
        payment_url: paymentRequest.longurl,
        customer_email: customerEmail,
        customer_name: customerName,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save order' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Order created successfully:', order.id);

    return new Response(
      JSON.stringify({
        orderId: order.id,
        paymentUrl: paymentRequest.longurl,
        paymentRequestId: paymentRequest.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in create-payment function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);