import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { useApp } from "../contexts/AppContext";
import { products } from "../data/products";
import { toast } from "sonner@2.0.3";

// Mostrar los 6 productos más destacados (ordenados por rating)
const featuredProducts = products
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

export function FeaturedProducts() {
  const { addToCart } = useCart();
  const { navigateToProduct, addToWishlist, removeFromWishlist, isInWishlist, navigateToCategory } = useApp();

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Lo más popular en Gaming</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Los productos más vendidos y mejor valorados por la comunidad gamer
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => {
            const inWishlist = isInWishlist(product.id);
            
            return (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div 
                    className="cursor-pointer"
                    onClick={() => navigateToProduct(product.id)}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
                      Nuevo
                    </Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge variant="destructive" className="absolute top-3 right-3">
                      -{product.discount}%
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="icon" 
                      variant={inWishlist ? "default" : "secondary"}
                      className="h-8 w-8 rounded-full shadow-md"
                      onClick={() => {
                        if (inWishlist) {
                          removeFromWishlist(product.id);
                          toast.info("Eliminado de favoritos");
                        } else {
                          addToWishlist(product.id);
                          toast.success("Agregado a favoritos");
                        }
                      }}
                    >
                      <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 
                    className="mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => navigateToProduct(product.id)}
                  >
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({product.reviews} reseñas)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full group/btn"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} agregado al carrito`);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Agregar al carrito
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigateToCategory("Todos los productos")}
          >
            Ver todos los productos
          </Button>
        </div>
      </div>
    </section>
  );
}