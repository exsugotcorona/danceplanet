import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Home, ShoppingBag, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const updateOrderStatus = async () => {
      const paymentId = searchParams.get('payment_id');
      const paymentRequestId = searchParams.get('payment_request_id');
      const paymentStatus = searchParams.get('payment_status');

      console.log('Payment callback received:', { paymentId, paymentRequestId, paymentStatus });

      if (!paymentRequestId) {
        console.error('Missing payment_request_id');
        setStatus('failed');
        return;
      }

      if (paymentStatus === 'Credit') {
        // Update order status to completed
        if (user) {
          try {
            const { data, error } = await supabase
              .from('orders')
              .update({ 
                status: 'completed',
                instamojo_payment_id: paymentId,
                updated_at: new Date().toISOString()
              })
              .eq('instamojo_payment_request_id', paymentRequestId)
              .eq('user_id', user.id)
              .select();

            if (error) {
              console.error('Error updating order:', error);
              toast({
                title: 'Error',
                description: 'Failed to update order status',
                variant: 'destructive',
              });
            } else {
              console.log('Order updated successfully:', data);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }

        setStatus('success');
        toast({
          title: 'Payment Successful!',
          description: 'Your order has been confirmed. Thank you for your purchase!',
        });
      } else {
        setStatus('failed');
        toast({
          title: 'Payment Failed',
          description: 'Your payment could not be processed. Please try again.',
          variant: 'destructive',
        });
      }
    };

    updateOrderStatus();
  }, [searchParams, toast, user]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric mx-auto mb-4"></div>
            <p className="text-muted-foreground">Processing your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-background to-primary/5" />
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-card/95 backdrop-blur border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              {status === 'success' ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {status === 'success' ? 'Payment Successful!' : 'Payment Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">
              {status === 'success' 
                ? 'Thank you for your purchase! Your order has been confirmed and you will receive a confirmation email shortly.'
                : 'Your payment could not be processed. Please check your payment details and try again.'
              }
            </p>

            <div className="space-y-3">
              <Button asChild className="w-full" variant="electric">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              {status === 'success' ? (
                <div className="space-y-2">
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/courses">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Courses
                    </Link>
                  </Button>
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/shop">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button asChild className="w-full" variant="outline">
                  <Link to="/shop">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Try Again
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;