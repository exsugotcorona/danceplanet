import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Package, Calendar, CreditCard, Play, X, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Purchase {
  id: string;
  item_type: string;
  item_name: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const MyPurchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching purchases:', error);
          toast({
            title: 'Error',
            description: 'Failed to load your purchases',
            variant: 'destructive',
          });
          return;
        }

        setPurchases(data || []);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your purchases',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <X className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-20 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Sign In Required</h1>
          <p className="text-muted-foreground">Please sign in to view your purchases.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 px-6 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-background to-primary/5" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Purchases</h1>
          <p className="text-lg text-muted-foreground">Track all your course and merchandise purchases</p>
        </div>

        {purchases.length === 0 ? (
          <Card className="text-center py-16 bg-card/95 backdrop-blur border-0 shadow-xl">
            <CardContent>
              <div className="w-20 h-20 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-electric" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">No purchases yet</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start your dance journey by purchasing courses or merchandise!
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="electric" asChild>
                  <a href="/courses">Browse Courses</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/shop">Visit Shop</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="bg-card/95 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-electric/10 rounded-xl flex items-center justify-center">
                        {purchase.item_type === 'course' ? (
                          <Play className="w-8 h-8 text-electric" />
                        ) : (
                          <ShoppingBag className="w-8 h-8 text-electric" />
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{purchase.item_name}</CardTitle>
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-xs font-medium">
                            {purchase.item_type === 'course' ? 'Course' : 'Product'}
                          </Badge>
                          <Badge className={`${getStatusColor(purchase.status)} flex items-center gap-1`}>
                            {getStatusIcon(purchase.status)}
                            {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground mb-2">
                        {formatAmount(purchase.amount, purchase.currency)}
                      </div>
                      {purchase.status === 'completed' && purchase.item_type === 'course' && (
                        <Button variant="electric" size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          View Course
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Separator className="mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground/80">Purchased</p>
                        <p className="text-sm font-medium">{formatDate(purchase.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground/80">Order ID</p>
                        <p className="text-sm font-medium font-mono">{purchase.id.slice(0, 8)}...</p>
                      </div>
                    </div>
                    {purchase.status === 'completed' && purchase.item_type === 'product' && (
                      <div className="flex items-center space-x-3 text-muted-foreground">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground/80">Status</p>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">Ready to Ship</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchases;