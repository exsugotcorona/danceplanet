import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Play, ShoppingBag, User, LogOut, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed out successfully',
        description: 'See you on the dance floor soon!',
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-electric rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Dance Planet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-electric relative",
                  isActive(item.href)
                    ? "text-electric after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-electric"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              user ? (
                 <div className="flex items-center space-x-3">
                   <div className="flex items-center space-x-2 text-sm">
                     <div className="w-8 h-8 bg-electric/10 rounded-full flex items-center justify-center">
                       <User className="w-4 h-4 text-electric" />
                     </div>
                     <span className="text-muted-foreground">
                       Welcome back!
                     </span>
                   </div>
                   <Button variant="ghost" size="sm" asChild>
                     <Link to="/my-purchases">
                       <Package className="w-4 h-4 mr-2" />
                       My Purchases
                     </Link>
                   </Button>
                   <Button variant="ghost" size="sm" onClick={handleSignOut}>
                     <LogOut className="w-4 h-4 mr-2" />
                     Sign Out
                   </Button>
                 </div>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/courses">
                      <Play className="w-4 h-4 mr-2" />
                      Learn
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/auth">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button variant="electric" size="sm" asChild>
                    <Link to="/shop">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Shop
                    </Link>
                  </Button>
                </>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "text-electric bg-electric/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                {!loading && (
                  user ? (
                    <>
                      <div className="flex items-center space-x-2 px-3 py-2">
                        <div className="w-8 h-8 bg-electric/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-electric" />
                        </div>
                        <span className="text-sm text-muted-foreground">Welcome back!</span>
                       </div>
                       <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                         <Link to="/my-purchases" onClick={() => setIsOpen(false)}>
                           <Package className="w-4 h-4 mr-2" />
                           My Purchases
                         </Link>
                       </Button>
                       <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
                         <LogOut className="w-4 h-4 mr-2" />
                         Sign Out
                       </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                        <Link to="/courses" onClick={() => setIsOpen(false)}>
                          <Play className="w-4 h-4 mr-2" />
                          Learn Dance
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <Link to="/auth" onClick={() => setIsOpen(false)}>
                          <User className="w-4 h-4 mr-2" />
                          Sign In
                        </Link>
                      </Button>
                      <Button variant="electric" size="sm" className="w-full justify-start" asChild>
                        <Link to="/shop" onClick={() => setIsOpen(false)}>
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Shop Now
                        </Link>
                      </Button>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;