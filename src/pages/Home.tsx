import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, ShoppingBag, Users, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-dance.jpg";
import instructorImage from "@/assets/instructor-1.jpg";
import Footer from "@/components/Footer";

const Home = () => {
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-hero mb-4 sm:mb-6 animate-fade-in">
            Dance. Connect. <span className="text-electric">Feel the Rhythm.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 animate-slide-up max-w-2xl mx-auto px-4">
            Master social jive with our expert video courses and join a community of passionate dancers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up max-w-lg mx-auto">
            <Button variant="hero" size="hero" className="group w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/courses">
                <Play className="mr-2 group-hover:scale-110 transition-transform" />
                Join the Class
              </Link>
            </Button>
            <Button variant="outline" size="hero" className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/shop">
                <ShoppingBag className="mr-2" />
                Shop the Merch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <Badge variant="outline" className="px-3 sm:px-4 py-1.5 sm:py-2 text-electric border-electric text-xs sm:text-sm">
                Our Philosophy
              </Badge>
              <h2 className="text-section">
                Social jive is more than dance — it's connection, fun, and self-expression.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                At Dance Planet, we believe dance should be accessible to everyone. Our carefully crafted 
                video courses break down complex moves into simple, learnable steps that build confidence 
                and create lasting connections.
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4">
                <div className="text-center flex-1 min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-bold text-electric">5,000+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Happy Dancers</div>
                </div>
                <div className="text-center flex-1 min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-bold text-electric">50+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Video Lessons</div>
                </div>
                <div className="text-center flex-1 min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-bold text-electric">4.9★</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
              <Button variant="electric" className="mt-4 sm:mt-6 w-full sm:w-auto min-h-[44px]" asChild>
                <Link to="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img
                src={instructorImage}
                alt="Dance instructor teaching social jive"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-electric text-electric-foreground p-4 sm:p-6 rounded-2xl shadow-xl">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                <div className="font-bold text-sm sm:text-base">Join Our Community</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Preview Sections */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Courses Preview */}
            <Card className="card-hover bg-card border-0 shadow-lg p-6 sm:p-8">
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-electric" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Expert Video Courses</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6">
                  From beginner basics to competition-level choreography, our structured courses 
                  guide you every step of the way.
                </p>
                <Button variant="electric" className="w-full sm:w-auto min-h-[44px]" asChild>
                  <Link to="/courses">
                    Explore Courses
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Shop Preview */}
            <Card className="card-hover bg-card border-0 shadow-lg p-6 sm:p-8">
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-electric" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Premium Dance Gear</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6">
                  Express your style with our premium dance apparel designed for comfort, 
                  style, and self-expression.
                </p>
                <Button variant="electric" className="w-full sm:w-auto min-h-[44px]" asChild>
                  <Link to="/shop">
                    Shop Now
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Badge variant="outline" className="px-3 sm:px-4 py-1.5 sm:py-2 text-electric border-electric mb-3 sm:mb-4 text-xs sm:text-sm">
              Community Love
            </Badge>
            <h2 className="text-section mb-3 sm:mb-4 px-4">What Dancers Say</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Join thousands of dancers who have transformed their skills and found their rhythm with Dance Planet.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-0 shadow-lg">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-electric text-electric" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="font-semibold text-sm sm:text-base text-foreground">{testimonial.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-section mb-3 sm:mb-4 text-white px-4">Ready to Start Dancing?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-4">
            Join thousands of dancers who have already started their journey with Dance Planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
            <Button variant="electric" size="lg" className="w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/courses">
                <Play className="mr-2" />
                Start Learning Today
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;