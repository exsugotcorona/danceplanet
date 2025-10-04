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

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  video_url: string;
  order_index: number;
}

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  lessons: Lesson[];
}

const CourseView = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourseAndCheckPurchase = async () => {
      setIsLoading(true);
      
      if (authLoading || !courseId) {
        return;
      }

      try {
        // Fetch course data with lessons
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select(`
            *,
            course_lessons (
              id,
              title,
              description,
              duration,
              video_url,
              order_index
            )
          `)
          .eq('slug', courseId)
          .single();

        if (courseError) {
          console.error('Error fetching course:', courseError);
          setIsLoading(false);
          return;
        }

        if (courseData) {
          const formattedCourse: Course = {
            ...courseData,
            lessons: (courseData.course_lessons || []).sort((a: Lesson, b: Lesson) => a.order_index - b.order_index)
          };
          setCourse(formattedCourse);
        }

        // Check purchase status if user is logged in
        if (user) {
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
              description: "Failed to verify course access. Please refresh the page.",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }

          const hasPurchased = data && data.length > 0;
          console.log('Purchase status:', { hasPurchased, ordersCount: data?.length });
          setIsPurchased(hasPurchased);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseAndCheckPurchase();

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
  }, [user, courseId, toast, authLoading]);

  const markLessonComplete = (lessonIndex: number) => {
    if (!completedLessons.includes(lessonIndex)) {
      setCompletedLessons([...completedLessons, lessonIndex]);
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
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Video Course</Badge>
            <Badge variant="outline">{course.duration}</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-muted-foreground text-lg mb-4">{course.description}</p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating} rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Instructor: {course.instructor}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player & Lesson Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <VideoPlayer 
                  src={currentLessonData.video_url}
                  title={currentLessonData.title}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentLessonData.title}</span>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentLessonData.duration}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{currentLessonData.description}</p>
                <Button 
                  onClick={() => markLessonComplete(currentLesson)}
                  className="w-full"
                  disabled={completedLessons.includes(currentLesson)}
                >
                  {completedLessons.includes(currentLesson) ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    'Mark as Complete'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Course Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id}>
                      <button
                        onClick={() => setCurrentLesson(index)}
                        className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                          currentLesson === index ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {completedLessons.includes(index) ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : currentLesson === index ? (
                              <Play className="w-5 h-5 text-primary" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium mb-1 text-sm">{lesson.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
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
