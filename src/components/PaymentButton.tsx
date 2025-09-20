import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  itemType: 'course' | 'product';
  itemId: string;
  itemName: string;
  amount: number;
  variant?: 'electric' | 'default' | 'outline';
  children: React.ReactNode;
  className?: string;
}

const PaymentButton = ({ 
  itemType, 
  itemId, 
  itemName, 
  amount, 
  variant = 'electric',
  children,
  className 
}: PaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to make a purchase.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Get user's profile for name and email
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single();

      const customerName = profile?.display_name || 'Customer';
      const customerEmail = user.email || '';

      console.log('Creating payment for:', { itemType, itemId, itemName, amount });

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          itemType,
          itemId,
          itemName,
          amount,
          customerName,
          customerEmail
        }
      });

      if (error) {
        console.error('Payment creation error:', error);
        throw error;
      }

      console.log('Payment created successfully:', data);

      if (data.paymentUrl) {
        // Redirect to Instamojo payment page
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('No payment URL received');
      }

    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: error.message || 'Failed to create payment link. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      onClick={handlePayment} 
      disabled={loading}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default PaymentButton;