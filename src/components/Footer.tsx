import { Heart, Users, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
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
              <Link to="/" className="block hover:text-electric transition-colors">
                Home
              </Link>
              <Link to="/courses" className="block hover:text-electric transition-colors">
                Courses
              </Link>
              <Link to="/shop" className="block hover:text-electric transition-colors">
                Shop
              </Link>
              <Link to="/about" className="block hover:text-electric transition-colors">
                About
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2 text-sm opacity-80">
              <Link to="/contact" className="block hover:text-electric transition-colors">
                Contact Us
              </Link>
              <div className="hover:text-electric cursor-pointer transition-colors">Help Center</div>
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
  );
};

export default Footer;