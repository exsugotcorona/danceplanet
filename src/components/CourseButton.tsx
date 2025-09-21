import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import PaymentButton from './PaymentButton';

interface CourseButtonProps {
  courseId: string;
  courseName: string;
  amount: number;
  className?: string;
  children?: React.ReactNode;
}

const CourseButton = ({ courseId, courseName, amount, className, children }: CourseButtonProps) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('item_type', 'course')
          .eq('item_id', courseId)
          .eq('status', 'completed')
          .maybeSingle();

        if (error) {
          console.error('Error checking purchase status:', error);
          setIsLoading(false);
          return;
        }

        setIsPurchased(!!data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPurchaseStatus();

    // Set up real-time subscription for order changes
    const channel = supabase
      .channel('order-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user?.id}`
        },
        (payload) => {
          console.log('Order change detected:', payload);
          // Check if this change affects our course
          const newRecord = payload.new as any;
          if (
            newRecord && 
            newRecord.item_type === 'course' && 
            newRecord.item_id === courseId &&
            newRecord.status === 'completed'
          ) {
            setIsPurchased(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, courseId]);

  if (isLoading) {
    return (
      <Button disabled className={className}>
        Loading...
      </Button>
    );
  }

  if (isPurchased) {
    return (
      <Button variant="electric" className={className}>
        <Play className="w-4 h-4 mr-2" />
        Start Learning
      </Button>
    );
  }

  return (
    <PaymentButton
      itemType="course"
      itemId={courseId}
      itemName={courseName}
      amount={amount}
      className={className}
    >
      {children}
    </PaymentButton>
  );
};

export default CourseButton;