import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Clock, Users, Zap, BookOpen } from "lucide-react";
import instructorImage from "@/assets/instructor-1.jpg";
import CourseButton from "@/components/CourseButton";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Beginner Jive Basics",
      description: "Master the fundamental steps and rhythms of social jive dance. Perfect for complete beginners who want to build a solid foundation.",
      price: "₹2,499",
      originalPrice: "₹3,499",
      duration: "2 hours",
      lessons: "12 lessons",
      level: "Beginner",
      thumbnail: instructorImage,
      features: ["Basic footwork", "Rhythm training", "Partner connection", "Practice exercises"],
      students: "2,340",
    },
    {
      id: 2,
      title: "Intermediate Swing Moves",
      description: "Advanced techniques and partner connection skills. Take your jive dancing to the next level with complex moves and styling.",
      price: "₹3,299",
      originalPrice: "₹4,499",
      duration: "3 hours", 
      lessons: "18 lessons",
      level: "Intermediate",
      thumbnail: instructorImage,
      features: ["Advanced footwork", "Spins and turns", "Leading/Following", "Musicality"],
      students: "1,876",
    },
    {
      id: 3,
      title: "Competition Style Jive",
      description: "Professional competition choreography and advanced techniques. Perfect for dancers ready to compete or perform.",
      price: "₹4,199",
      originalPrice: "₹5,999",
      duration: "4 hours",
      lessons: "24 lessons",
      level: "Advanced",
      thumbnail: instructorImage,
      features: ["Competition choreography", "Performance skills", "Advanced styling", "Contest preparation"],
      students: "892",
    },
    {
      id: 4,
      title: "Complete Jive Mastery",
      description: "All three courses bundled together for the ultimate jive learning experience. Save 30% when you buy the complete bundle.",
      price: "₹6,999",
      originalPrice: "₹9,997",
      duration: "9 hours",
      lessons: "54 lessons",
      level: "All Levels",
      thumbnail: instructorImage,
      features: ["All beginner content", "All intermediate content", "All advanced content", "Bonus masterclasses"],
      students: "5,643",
      popular: true,
    },
  ];

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
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <Card key={course.id} className={`card-hover bg-card border-0 shadow-lg group relative ${course.popular ? 'ring-2 ring-electric' : ''}`}>
                {course.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-electric text-electric-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
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
                        <BookOpen className="w-4 h-4" />
                        {course.lessons}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students} students
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
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
                      <span className="text-2xl font-bold text-electric">{course.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                    </div>
                    <CourseButton
                      courseId={course.id.toString()}
                      courseName={course.title}
                      amount={parseFloat(course.price.replace('₹', '').replace(',', ''))}
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