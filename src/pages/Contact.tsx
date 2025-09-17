import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@danceplanet.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 98765 43210",
      description: "Mon-Fri 9AM-6PM IST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Mumbai, Maharashtra, India",
      description: "Our dance studio location"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Within 24 hours",
      description: "We respond quickly"
    }
  ];

  const faqs = [
    {
      question: "How do I access my courses after purchase?",
      answer: "After purchasing a course, you'll receive login credentials via email. You can then access all your courses from your dashboard."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied, contact us for a full refund."
    },
    {
      question: "Do you offer group discounts?",
      answer: "Yes, we offer special pricing for dance studios, schools, and groups of 10 or more. Contact us for custom pricing."
    },
    {
      question: "How do I track my merchandise order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can track your package using this number."
    }
  ];

  const supportTypes = [
    {
      icon: MessageSquare,
      title: "General Inquiry",
      description: "Questions about our courses or services"
    },
    {
      icon: HelpCircle,
      title: "Technical Support",
      description: "Help with accessing courses or website issues"
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Collaboration or business partnership inquiries"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="px-4 py-2 text-electric border-electric mb-4">
            Contact Us
          </Badge>
          <h1 className="text-section mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our courses, need technical support, or want to partner with us? 
            We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg card-hover">
                <div className="w-12 h-12 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-electric" />
                </div>
                <h3 className="font-bold mb-2">{info.title}</h3>
                <p className="text-electric font-medium mb-1">{info.details}</p>
                <p className="text-muted-foreground text-sm">{info.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Support Types */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 border-0 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                </div>
                
                <Button type="submit" variant="electric" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Support Types */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">How Can We Help?</h2>
              <p className="text-muted-foreground">
                Choose the type of inquiry that best describes your needs:
              </p>
              
              <div className="space-y-4">
                {supportTypes.map((type, index) => (
                  <Card key={index} className="p-6 border-0 shadow-lg card-hover cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-electric/10 rounded-full flex items-center justify-center">
                        <type.icon className="w-5 h-5 text-electric" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{type.title}</h3>
                        <p className="text-muted-foreground text-sm">{type.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 border-0 shadow-lg bg-electric/5">
                <h3 className="font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  For urgent technical issues or course access problems, check our FAQ section below 
                  or email us directly at support@danceplanet.com
                </p>
                <Button variant="outline" size="sm">
                  View FAQ
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about our courses and services.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg">
                <h3 className="font-bold mb-3 text-electric">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours & Social Media */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-electric/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> We respond to emails within 24 hours, even outside business hours.
                </p>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <p className="text-muted-foreground mb-6">
                Stay connected with our dance community on social media for the latest updates, 
                dance tips, and community highlights.
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  @DancePlanetOfficial
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Dance Planet Community
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Newsletter Updates
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;