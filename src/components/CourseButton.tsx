import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [courseData, setCourseData] = useState<{ id: string; slug: string; title: string } | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // First fetch course data to get all identifiers
        const { data: course, error: courseError } = await supabase
          .from('courses')
          .select('id, slug, title')
          .or(`slug.eq.${courseId},id.eq.${courseId}`)
          .single();

        if (courseError || !course) {
          console.error('Error fetching course:', courseError);
          setIsLoading(false);
          return;
        }

        setCourseData(course);

        // Check purchase status using all possible identifiers
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('item_type', 'course')
          .eq('status', 'completed');

        if (error) {
          console.error('Error checking purchase status:', error);
          setIsLoading(false);
          return;
        }

        // Check if any order matches course by id, slug, or title
        const purchased = (data || []).some((o: any) =>
          o.item_id === course.id ||
          o.item_id === course.slug ||
          o.item_name === course.title
        );
        console.log(`Course ${courseId} purchase status:`, purchased);
        setIsPurchased(purchased);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPurchaseStatus();

    if (!user || !courseData) return;

    // Set up real-time subscription for order changes
    const channel = supabase
      .channel(`course-${courseId}-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Order change detected:', payload);
          const record = payload.new as any;
          
          // Check if this update affects our specific course using any identifier
          if (
            record && 
            record.item_type === 'course' && 
            (record.item_id === courseData.id ||
             record.item_id === courseData.slug ||
             record.item_name === courseData.title) &&
            record.status === 'completed'
          ) {
            console.log(`Course ${courseId} marked as purchased via real-time`);
            setIsPurchased(true);
          }
        }
      )
      .subscribe((status) => {
        console.log(`Subscription status for course ${courseId}:`, status);
      });

    return () => {
      console.log(`Cleaning up subscription for course ${courseId}`);
      supabase.removeChannel(channel);
    };
  }, [user, courseId, courseData]);

  if (isLoading) {
    return (
      <Button disabled className={className}>
        Loading...
      </Button>
    );
  }

  if (isPurchased) {
    return (
      <Button variant="electric" className={className} asChild>
        <Link to={`/course/${courseId}`}>
          <Play className="w-4 h-4 mr-2" />
          ENROLLED - Start Learning
        </Link>
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