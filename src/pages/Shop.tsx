import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, ShoppingBag, Star, Truck, Shield, RotateCcw, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import hoodieImage from "@/assets/hoodie-black.jpg";
import tshirtImage from "@/assets/tshirt-blue.jpg";
import AddToCartDialog from "@/components/AddToCartDialog";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
}

const Shop = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const categories = ["All", "clothing", "accessories"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(item => item.category === selectedCategory);

  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over ₹2,999"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure checkout"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="px-4 py-2 text-electric border-electric mb-4">
            Dance Gear
          </Badge>
          <h1 className="text-section mb-4">Express Your Style</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium dance apparel designed for comfort, style, and self-expression on and off the dance floor.
          </p>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-electric/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-electric" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">{benefit.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "electric" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card border-0 shadow-lg">
                  <Skeleton className="w-full h-48 sm:h-64" />
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredProducts.map((item) => (
                <Card key={item.id} className="card-hover bg-card border-0 shadow-lg group overflow-hidden relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.name} - ${item.category}`}
                      className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="bg-white/80 hover:bg-white w-9 h-9 sm:w-10 sm:h-10"
                        onClick={() => toggleFavorite(item.id)}
                        aria-label="Add to favorites"
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''
                          }`} 
                        />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {item.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{item.name}</h3>
                    
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs sm:text-sm font-medium">Colors:</span>
                      </div>
                      <div className="flex gap-2">
                        {item.colors.slice(0, 3).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-border"
                            style={{
                              backgroundColor: color === "Electric Blue" || color === "Blue" ? "#0080FF" :
                                             color === "Black" ? "#000000" :
                                             color === "White" ? "#FFFFFF" :
                                             color === "Navy" ? "#1e3a8a" :
                                             color === "Gray" ? "#6b7280" :
                                             color === "Red" ? "#ef4444" :
                                             color === "Pink" ? "#ec4899" :
                                             color === "Clear" ? "#f3f4f6" :
                                             "#f3f4f6"
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-3 sm:mb-4">
                      <span className="text-xs sm:text-sm font-medium mb-2 block">Sizes:</span>
                      <div className="flex gap-2 flex-wrap">
                        {item.sizes.map((size, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl font-bold text-electric">₹{item.price.toLocaleString()}</span>
                        {item.original_price && (
                          <span className="text-xs sm:text-sm text-muted-foreground line-through">₹{item.original_price.toLocaleString()}</span>
                        )}
                      </div>
                      <Button
                        variant="electric"
                        className="group text-xs sm:text-sm px-3 py-2 h-9 sm:h-10 w-full sm:w-auto min-h-[44px]"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1 sm:mr-2 group-hover:scale-110 transition-transform" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-section mb-4">More Coming Soon</h2>
            <p className="text-lg text-muted-foreground">
              We're constantly adding new designs and products to our collection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover bg-muted/50 border-2 border-dashed border-electric/30 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-electric/20 transition-colors">
                  <Zap className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-lg font-bold mb-2">Dance Shoes</h3>
                <p className="text-sm text-muted-foreground">
                  Professional dance shoes coming soon
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover bg-muted/50 border-2 border-dashed border-electric/30 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-electric/20 transition-colors">
                  <Heart className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-lg font-bold mb-2">Limited Editions</h3>
                <p className="text-sm text-muted-foreground">
                  Exclusive limited edition designs
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover bg-muted/50 border-2 border-dashed border-electric/30 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-electric/20 transition-colors">
                  <ShoppingBag className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-lg font-bold mb-2">Custom Orders</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized designs for teams and studios
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <AddToCartDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Shop;