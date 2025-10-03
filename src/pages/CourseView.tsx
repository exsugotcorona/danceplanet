import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import VideoPlayer from '@/components/VideoPlayer';
import { Play, Lock, CheckCircle, Clock, Users, Star } from 'lucide-react';

// Course data - in a real app, this would come from your database
const courseData = {
  'beginner-jive-basics': {
    id: 'beginner-jive-basics',
    title: 'Beginner Jive Basics',
    description: 'Learn the fundamentals of Jive dance with easy-to-follow instructions',
    instructor: 'Dance Master',
    duration: '4 weeks',
    students: 1234,
    rating: 5.0,
    lessons: [
      {
        id: 1,
        title: 'Jive Fundamentals',
        duration: '10:00',
        videoUrl: 'https://www.youtube.com/embed/kQ25jdxa_Rs',
        description: 'Master the basic steps and movements of Jive dance.'
      }
    ]
  },
  'advanced-choreography': {
    id: 'advanced-choreography',
    title: 'Advanced Choreography',
    description: 'Master complex choreography and performance techniques',
    instructor: 'Elena Rodriguez',
    duration: '12 weeks',
    students: 567,
    rating: 4.9,
    lessons: [
      {
        id: 1,
        title: 'Complex Sequences',
        duration: '30:15',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Learn to master intricate choreographic sequences.'
      }
    ]
  },
  // Legacy course ID support
  '1': {
    id: 'beginner-jive-basics',
    title: 'Beginner Jive Basics',
    description: 'Learn the fundamentals of Jive dance with easy-to-follow instructions',
    instructor: 'Dance Master',
    duration: '4 weeks',
    students: 1234,
    rating: 5.0,
    lessons: [
      {
        id: 1,
        title: 'Jive Fundamentals',
        duration: '10:00',
        videoUrl: 'https://www.youtube.com/embed/kQ25jdxa_Rs',
        description: 'Master the basic steps and movements of Jive dance.'
      }
    ]
  }
};

const CourseView = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const course = courseId ? courseData[courseId as keyof typeof courseData] : null;

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!user || !courseId) {
        setIsLoading(false);
        return;
      }

      try {
        console.log('Checking purchase status for:', { userId: user.id, courseId });
        
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('item_type', 'course')
          .eq('item_id', courseId)
          .eq('status', 'completed');

        if (error) {
          console.error('Error checking purchase status:', error);
          toast({
            title: "Error",
            description: "Failed to verify course access",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const hasPurchased = data && data.length > 0;
        console.log('Purchase status:', { hasPurchased, ordersCount: data?.length });
        setIsPurchased(hasPurchased);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to verify course access",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkPurchaseStatus();

    // Set up real-time subscription
    if (!user || !courseId) return;

    const channel = supabase
      .channel(`course-view-${courseId}-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Course purchase update:', payload);
          const record = payload.new as any;
          
          if (
            record && 
            record.item_type === 'course' && 
            record.item_id === courseId &&
            record.status === 'completed'
          ) {
            console.log('Course access granted via real-time update');
            setIsPurchased(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, courseId, toast]);

  const markLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      toast({
        title: "Lesson Complete!",
        description: "Great job! You've completed this lesson.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isPurchased) {
    return <Navigate to="/courses" replace />;
  }

  const currentLessonData = course.lessons[currentLesson];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Course</Badge>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{course.instructor}</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">{course.description}</p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.students} students
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {course.rating}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <VideoPlayer
              src={currentLessonData.videoUrl}
              title={`Lesson ${currentLesson + 1}: ${currentLessonData.title}`}
              className="mb-6"
            />
            
            {/* Lesson Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Lesson {currentLesson + 1}: {currentLessonData.title}</span>
                  <Badge variant="outline">{currentLessonData.duration}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{currentLessonData.description}</p>
                <Button 
                  onClick={() => markLessonComplete(currentLessonData.id)}
                  disabled={completedLessons.includes(currentLessonData.id)}
                  className="w-full"
                >
                  {completedLessons.includes(currentLessonData.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Complete
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Course Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id}>
                      <button
                        onClick={() => setCurrentLesson(index)}
                        className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${
                          currentLesson === index ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {completedLessons.includes(lesson.id) ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : currentLesson === index ? (
                              <Play className="w-5 h-5 text-primary" />
                            ) : (
                              <Lock className="w-5 h-5 text-muted-foreground" />
                            )}
                            <div>
                              <p className="font-medium text-sm">
                                Lesson {index + 1}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {lesson.title}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {lesson.duration}
                          </span>
                        </div>
                      </button>
                      {index < course.lessons.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;