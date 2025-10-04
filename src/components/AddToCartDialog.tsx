import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface AddToCartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    sizes: string[];
    colors: string[];
  };
}

const AddToCartDialog = ({ open, onOpenChange, product }: AddToCartDialogProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedSize}) added to your cart`,
    });

    onOpenChange(false);
    setSelectedSize("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Size & Color</DialogTitle>
          <DialogDescription>
            Choose your preferred size and color for {product.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-xl font-bold text-electric">₹{product.price.toLocaleString()}</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Select Size *</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Badge
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedSize === size ? "bg-electric text-white" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Select Color</label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <Badge
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedColor === color ? "bg-electric text-white" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            variant="electric"
            className="w-full"
            size="lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartDialog;
