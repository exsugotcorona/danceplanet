import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Heart, Star, Award, Play, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import instructorImage from "@/assets/instructor-1.jpg";

const About = () => {
  const stats = [
    { number: "5,000+", label: "Happy Dancers", icon: Users },
    { number: "50+", label: "Video Lessons", icon: Play },
    { number: "4.9★", label: "Average Rating", icon: Star },
    { number: "3+", label: "Years Experience", icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Dance",
      description: "We believe dance is a universal language that brings people together and creates lasting joy."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a supportive community where every dancer feels welcome, valued, and encouraged to grow."
    },
    {
      icon: Star,
      title: "Quality Education",
      description: "Providing world-class instruction with clear, structured lessons that make learning enjoyable."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly improving our teaching methods and platform to deliver the best learning experience."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & Lead Instructor",
      bio: "Professional dancer with 15+ years of experience in social jive and swing dance.",
      image: instructorImage,
    },
    {
      name: "Mike Chen",
      role: "Creative Director",
      bio: "Former competition dancer specializing in choreography and performance techniques.",
      image: instructorImage,
    },
    {
      name: "Emma Rodriguez",
      role: "Community Manager",
      bio: "Dance enthusiast dedicated to building connections within our dance community.",
      image: instructorImage,
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="px-4 py-2 text-electric border-electric mb-4">
            About Dance Planet
          </Badge>
          <h1 className="text-section mb-6">Our Story</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dance Planet was born from a simple belief: everyone deserves to experience the joy, 
            connection, and self-expression that comes from social dance. We're here to make 
            high-quality dance education accessible to dancers around the world.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-electric" />
                </div>
                <div className="text-3xl font-bold text-electric mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="px-4 py-2 text-electric border-electric">
                Our Mission
              </Badge>
              <h2 className="text-section">
                Making Dance Accessible to Everyone
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that social jive is more than just dance steps—it's about connection, 
                community, and self-expression. Our mission is to break down barriers and make 
                high-quality dance education accessible to people regardless of their location, 
                experience level, or background.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through our carefully crafted video courses, supportive community, and premium 
                dance gear, we're building a global movement of passionate dancers who share 
                our love for rhythm, connection, and joy.
              </p>
              <Button variant="electric" asChild>
                <Link to="/courses">
                  Start Your Journey
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src={instructorImage}
                alt="Dance community"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do at Dance Planet, from course creation 
              to community building.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg card-hover">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate dancers and educators dedicated to sharing the joy of social jive with the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg card-hover">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-electric font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section mb-4">Our Journey</h2>
          </div>
          
          <div className="space-y-8">
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-electric text-electric-foreground rounded-full flex items-center justify-center font-bold">
                  2021
                </div>
                <h3 className="text-xl font-bold">The Beginning</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Dance Planet started as a small local dance studio with a big dream: to make 
                social jive accessible to everyone. Our founder, Sarah, began teaching small 
                groups of enthusiastic dancers who shared her passion for connection through movement.
              </p>
            </Card>
            
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-electric text-electric-foreground rounded-full flex items-center justify-center font-bold">
                  2022
                </div>
                <h3 className="text-xl font-bold">Going Digital</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                As our community grew, we realized we needed to reach dancers beyond our local area. 
                We launched our first online video courses, bringing professional jive instruction 
                to dancers around the world.
              </p>
            </Card>
            
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-electric text-electric-foreground rounded-full flex items-center justify-center font-bold">
                  2023
                </div>
                <h3 className="text-xl font-bold">Building Community</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We expanded beyond just courses to create a complete dance experience, launching 
                our merchandise line and building a vibrant online community where dancers from 
                all backgrounds can connect, learn, and grow together.
              </p>
            </Card>
            
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-electric text-electric-foreground rounded-full flex items-center justify-center font-bold">
                  2024
                </div>
                <h3 className="text-xl font-bold">The Future</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Today, Dance Planet serves thousands of dancers worldwide. We continue to innovate, 
                adding new courses, expanding our product line, and building tools that make learning 
                dance more enjoyable and accessible than ever before.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-section mb-4 text-white">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Become part of a global community of dancers who share your passion for jive and social connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="electric" size="lg" asChild>
              <Link to="/courses">
                <Play className="mr-2" />
                Start Learning
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
    </div>
  );
};

export default About;