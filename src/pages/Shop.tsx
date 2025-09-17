import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, Zap } from "lucide-react";
import { useState } from "react";
import hoodieImage from "@/assets/hoodie-black.jpg";
import tshirtImage from "@/assets/tshirt-blue.jpg";

const Shop = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const merchandise = [
    {
      id: 1,
      name: "Dance Planet Hoodie",
      price: "₹4,999",
      originalPrice: "₹6,499",
      image: hoodieImage,
      description: "Premium black hoodie with embroidered Dance Planet logo",
      category: "Hoodies",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Navy", "Gray"],
      rating: 4.8,
      reviews: 124,
      bestseller: true,
    },
    {
      id: 2,
      name: "Electric Blue Tee",
      price: "₹2,499",
      originalPrice: "₹3,199",
      image: tshirtImage,
      description: "Comfortable dance t-shirt in electric blue with logo print",
      category: "T-Shirts",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Electric Blue", "Black", "White"],
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "Dance Planet Cap",
      price: "₹1,999",
      originalPrice: "₹2,499",
      image: hoodieImage, // placeholder
      description: "Adjustable cap with embroidered logo, perfect for casual wear",
      category: "Accessories",
      sizes: ["One Size"],
      colors: ["Black", "White", "Navy"],
      rating: 4.7,
      reviews: 56,
    },
    {
      id: 4,
      name: "Dance Crew Sweatshirt",
      price: "₹3,999",
      originalPrice: "₹5,199",
      image: tshirtImage, // placeholder
      description: "Cozy sweatshirt for dance practice and casual wear",
      category: "Sweatshirts",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Gray", "Black", "Navy"],
      rating: 4.6,
      reviews: 73,
    },
    {
      id: 5,
      name: "Performance Tank Top",
      price: "₹2,199",
      originalPrice: "₹2,799",
      image: hoodieImage, // placeholder
      description: "Breathable tank top designed for intense dance sessions",
      category: "Tank Tops",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Black", "White", "Electric Blue"],
      rating: 4.9,
      reviews: 45,
    },
    {
      id: 6,
      name: "Dance Planet Tote Bag",
      price: "₹1,799",
      originalPrice: "₹2,299",
      image: tshirtImage, // placeholder
      description: "Spacious tote bag for carrying dance gear and essentials",
      category: "Accessories",
      sizes: ["One Size"],
      colors: ["Black", "Natural", "Navy"],
      rating: 4.5,
      reviews: 32,
    },
  ];

  const categories = ["All", "Hoodies", "T-Shirts", "Sweatshirts", "Tank Tops", "Accessories"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? merchandise 
    : merchandise.filter(item => item.category === selectedCategory);

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
      <section className="py-8 px-6 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-electric/10 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-electric" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
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
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((item) => (
              <Card key={item.id} className="card-hover bg-card border-0 shadow-lg group overflow-hidden relative">
                {item.bestseller && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-electric text-electric-foreground">
                      Bestseller
                    </Badge>
                  </div>
                )}
                
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(item.id)}
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''
                        }`} 
                      />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-electric text-electric" />
                      <span className="text-xs text-muted-foreground">
                        {item.rating} ({item.reviews})
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium">Colors:</span>
                    </div>
                    <div className="flex gap-2">
                      {item.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full border-2 border-border"
                          style={{
                            backgroundColor: color === "Electric Blue" ? "#0080FF" :
                                           color === "Black" ? "#000000" :
                                           color === "White" ? "#FFFFFF" :
                                           color === "Navy" ? "#1e3a8a" :
                                           color === "Gray" ? "#6b7280" :
                                           "#f3f4f6"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium mb-2 block">Sizes:</span>
                    <div className="flex gap-2 flex-wrap">
                      {item.sizes.map((size, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-electric">{item.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                    </div>
                    <Button variant="electric" size="sm" className="group">
                      <ShoppingBag className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
    </div>
  );
};

export default Shop;