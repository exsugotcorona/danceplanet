import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play, ShoppingBag, Heart, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-dance.jpg";
import instructorImage from "@/assets/instructor-1.jpg";
import hoodieImage from "@/assets/hoodie-black.jpg";
import tshirtImage from "@/assets/tshirt-blue.jpg";

const Index = () => {
  const courses = [
    {
      id: 1,
      title: "Beginner Jive Basics",
      description: "Master the fundamental steps and rhythms",
      price: "$29",
      duration: "2 hours",
      level: "Beginner",
      thumbnail: instructorImage,
    },
    {
      id: 2,
      title: "Intermediate Swing Moves",
      description: "Advanced techniques and partner connection",
      price: "$39",
      duration: "3 hours", 
      level: "Intermediate",
      thumbnail: instructorImage,
    },
    {
      id: 3,
      title: "Competition Style Jive",
      description: "Professional competition choreography",
      price: "$49",
      duration: "4 hours",
      level: "Advanced",
      thumbnail: instructorImage,
    },
  ];

  const merchandise = [
    {
      id: 1,
      name: "Dance Planet Hoodie",
      price: "$59",
      image: hoodieImage,
      description: "Premium black hoodie with logo"
    },
    {
      id: 2,
      name: "Electric Blue Tee",
      price: "$29",
      image: tshirtImage,
      description: "Comfortable dance t-shirt"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      text: "These courses transformed my dancing! The instruction is clear and the community is amazing.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez", 
      text: "Finally learned proper jive technique. The step-by-step approach made all the difference.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      text: "Love the energy and passion in every lesson. Highly recommend Dance Planet!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-hero mb-6 animate-fade-in">
            Dance. Connect. <span className="text-electric">Feel the Rhythm.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up max-w-2xl mx-auto">
            Master social jive with our expert video courses and join a community of passionate dancers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button variant="hero" size="hero" className="group">
              <Play className="mr-2 group-hover:scale-110 transition-transform" />
              Join the Class
            </Button>
            <Button variant="outline" size="hero" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <ShoppingBag className="mr-2" />
              Shop the Merch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="px-4 py-2 text-electric border-electric">
                Our Philosophy
              </Badge>
              <h2 className="text-section">
                Social jive is more than dance — it's connection, fun, and self-expression.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Dance Planet, we believe dance should be accessible to everyone. Our carefully crafted 
                video courses break down complex moves into simple, learnable steps that build confidence 
                and create lasting connections.
              </p>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric">5,000+</div>
                  <div className="text-sm text-muted-foreground">Happy Dancers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric">50+</div>
                  <div className="text-sm text-muted-foreground">Video Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric">4.9★</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={instructorImage}
                alt="Dance instructor teaching"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-electric text-electric-foreground p-6 rounded-2xl shadow-xl">
                <Users className="w-8 h-8 mb-2" />
                <div className="font-bold">Join Our Community</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 text-electric border-electric mb-4">
              Video Courses
            </Badge>
            <h2 className="text-section mb-4">Master Every Move</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From beginner basics to competition-level choreography, our structured courses 
              guide you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={course.id} className="card-hover bg-card border-0 shadow-lg group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-electric text-electric" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-electric">{course.price}</span>
                    <Button variant="electric" className="group">
                      Buy Now
                      <Zap className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 text-electric border-electric mb-4">
              Dance Gear
            </Badge>
            <h2 className="text-section mb-4">Express Your Style</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium dance apparel designed for comfort, style, and self-expression on and off the dance floor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {merchandise.map((item, index) => (
              <Card key={item.id} className="card-hover bg-card border-0 shadow-lg group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-electric">{item.price}</span>
                    <Button variant="electric" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Coming Soon Cards */}
            <Card className="card-hover bg-muted/50 border-2 border-dashed border-electric/30 group">
              <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                  <Zap className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-lg font-bold mb-2">More Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Exciting new dance gear launching soon. Stay tuned!
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover bg-muted/50 border-2 border-dashed border-electric/30 group">
              <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                  <Users className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-lg font-bold mb-2">Custom Designs</h3>
                <p className="text-sm text-muted-foreground">
                  Request custom designs for your dance team or studio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 text-electric border-electric mb-4">
              Community Love
            </Badge>
            <h2 className="text-section mb-4">What Dancers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of dancers who have transformed their skills and found their rhythm with Dance Planet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-electric text-electric" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-electric">Dance Planet</h3>
              <p className="text-sm opacity-80">
                Connecting dancers worldwide through the joy of social jive.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <div className="space-y-2 text-sm opacity-80">
                <div className="hover:text-electric cursor-pointer transition-colors">Home</div>
                <div className="hover:text-electric cursor-pointer transition-colors">Courses</div>
                <div className="hover:text-electric cursor-pointer transition-colors">Merchandise</div>
                <div className="hover:text-electric cursor-pointer transition-colors">Community</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm opacity-80">
                <div className="hover:text-electric cursor-pointer transition-colors">Help Center</div>
                <div className="hover:text-electric cursor-pointer transition-colors">Contact Us</div>
                <div className="hover:text-electric cursor-pointer transition-colors">Privacy Policy</div>
                <div className="hover:text-electric cursor-pointer transition-colors">Terms of Service</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-electric/20 rounded-full flex items-center justify-center hover:bg-electric transition-colors cursor-pointer">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-electric/20 rounded-full flex items-center justify-center hover:bg-electric transition-colors cursor-pointer">
                  <Users className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-electric/20 rounded-full flex items-center justify-center hover:bg-electric transition-colors cursor-pointer">
                  <Play className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 Dance Planet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;