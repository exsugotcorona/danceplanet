import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Clock, Users, Zap, BookOpen } from "lucide-react";
import instructorImage from "@/assets/instructor-1.jpg";
import CourseButton from "@/components/CourseButton";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  thumbnail: string;
  instructor: string;
  students: number;
  rating: number;
  features: string[];
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setCourses(data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const benefits = [
    {
      icon: Play,
      title: "HD Video Lessons",
      description: "Crystal clear instruction with multiple camera angles"
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description: "Lifetime access to all course materials"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join our private community of passionate dancers"
    },
    {
      icon: BookOpen,
      title: "Practice Materials",
      description: "Downloadable guides and practice tracks"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="px-4 py-2 text-electric border-electric mb-4">
            Video Courses
          </Badge>
          <h1 className="text-section mb-4">Master Every Move</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From beginner basics to competition-level choreography, our structured courses 
            guide you every step of the way. Learn from expert instructors at your own pace.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Card key={i} className="bg-card border-0 shadow-lg">
                  <Skeleton className="w-full h-48 rounded-t-lg" />
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {courses.map((course) => (
              <Card key={course.id} className="card-hover bg-card border-0 shadow-lg group relative">
                
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/80 text-white px-2 py-1 rounded text-sm">
                      {course.duration}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students.toLocaleString()} students
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(Math.floor(course.rating))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-electric text-electric" />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">What you'll learn:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-electric rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-electric">₹{course.price.toLocaleString()}</span>
                    </div>
                    <CourseButton
                      courseId={course.slug}
                      courseName={course.title}
                      amount={Number(course.price)}
                      className="group"
                    >
                      Enroll Now
                      <Zap className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform" />
                    </CourseButton>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold mb-2">Do I need any prior dance experience?</h3>
              <p className="text-muted-foreground">Not at all! Our beginner course starts from the very basics and assumes no prior dance experience.</p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-bold mb-2">How long do I have access to the courses?</h3>
              <p className="text-muted-foreground">You get lifetime access to all course materials, so you can learn at your own pace and revisit lessons anytime.</p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-bold mb-2">Can I learn without a partner?</h3>
              <p className="text-muted-foreground">Yes! We teach both individual techniques and partner work. You can practice solo and apply partner techniques when you find a dance partner.</p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-bold mb-2">Is there a money-back guarantee?</h3>
              <p className="text-muted-foreground">Absolutely! We offer a 30-day money-back guarantee. If you're not satisfied with your course, we'll refund your money.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;