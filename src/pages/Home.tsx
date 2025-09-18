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
            <Button variant="hero" size="hero" className="group" asChild>
              <Link to="/courses">
                <Play className="mr-2 group-hover:scale-110 transition-transform" />
                Join the Class
              </Link>
            </Button>
            <Button variant="outline" size="hero" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link to="/auth">
                <Users className="mr-2" />
                Sign Up Now
              </Link>
            </Button>
            <Button variant="outline" size="hero" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link to="/shop">
                <ShoppingBag className="mr-2" />
                Shop the Merch
              </Link>
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
              <Button variant="electric" className="mt-6" asChild>
                <Link to="/about">
                  Learn More About Us
                </Link>
              </Button>
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

      {/* Quick Preview Sections */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Courses Preview */}
            <Card className="card-hover bg-card border-0 shadow-lg p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Expert Video Courses</h3>
                <p className="text-muted-foreground mb-6">
                  From beginner basics to competition-level choreography, our structured courses 
                  guide you every step of the way.
                </p>
                <Button variant="electric" asChild>
                  <Link to="/courses">
                    Explore Courses
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Shop Preview */}
            <Card className="card-hover bg-card border-0 shadow-lg p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Premium Dance Gear</h3>
                <p className="text-muted-foreground mb-6">
                  Express your style with our premium dance apparel designed for comfort, 
                  style, and self-expression.
                </p>
                <Button variant="electric" asChild>
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
      <section className="py-20 px-6">
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-section mb-4 text-white">Ready to Start Dancing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of dancers who have already started their journey with Dance Planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="electric" size="lg" asChild>
              <Link to="/courses">
                <Play className="mr-2" />
                Start Learning Today
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
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