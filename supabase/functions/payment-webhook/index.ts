import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const webhookData = await req.json();
    console.log('Webhook received:', webhookData);

    const instamojoApiKey = Deno.env.get('INSTAMOJO_API_KEY');
    const instamojoAuthToken = Deno.env.get('INSTAMOJO_AUTH_TOKEN');

    if (!instamojoApiKey || !instamojoAuthToken) {
      console.error('Missing Instamojo credentials');
      return new Response('Configuration error', { status: 500, headers: corsHeaders });
    }

    // Verify payment with Instamojo
    const paymentId = webhookData.payment_id;
    
    const verifyResponse = await fetch(`https://test.instamojo.com/api/1.1/payments/${paymentId}/`, {
      method: 'GET',
      headers: {
        'X-Api-Key': instamojoApiKey,
        'X-Auth-Token': instamojoAuthToken,
      },
    });

    const verifyData = await verifyResponse.json();
    console.log('Payment verification:', verifyData);

    if (!verifyResponse.ok || !verifyData.success) {
      console.error('Payment verification failed:', verifyData);
      return new Response('Payment verification failed', { status: 400, headers: corsHeaders });
    }

    const payment = verifyData.payment;
    const paymentRequestId = payment.payment_request;
    const status = payment.status === 'Credit' ? 'completed' : 'failed';

    // Update order status in database
    const { data: updatedOrder, error: updateError } = await supabaseClient
      .from('orders')
      .update({
        instamojo_payment_id: paymentId,
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('instamojo_payment_request_id', paymentRequestId)
      .select()
      .single();

    if (updateError) {
      console.error('Failed to update order:', updateError);
      return new Response('Failed to update order', { status: 500, headers: corsHeaders });
    }

    console.log('Order updated successfully:', updatedOrder);

    return new Response(
      JSON.stringify({ success: true, orderId: updatedOrder.id, status: status }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in payment-webhook function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);