import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Heart, ShoppingCart, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { useApp } from "../contexts/AppContext";
import { Product } from "../data/products";
import { toast } from "sonner@2.0.3";

interface SearchResultsProps {
  products: Product[];
  searchQuery: string;
  onClose: () => void;
}

export function SearchResults({ products, searchQuery, onClose }: SearchResultsProps) {
  const { addToCart } = useCart();
  const { navigateToProduct, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  
  if (!searchQuery) return null;

  return (
    <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 pt-24 pb-8 max-h-screen overflow-y-auto">
        <div className="bg-background rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-1">
                Resultados de búsqueda
              </h2>
              <p className="text-muted-foreground">
                {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'} para "{searchQuery}"
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Results */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-2">
                No se encontraron productos
              </p>
              <p className="text-muted-foreground text-sm">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const inWishlist = isInWishlist(product.id);
                
                return (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <div 
                        className="cursor-pointer"
                        onClick={() => {
                          navigateToProduct(product.id);
                          onClose();
                        }}
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs mb-2">
                          {product.category}
                        </Badge>
                      </div>
                      
                      <h3 
                        className="mb-2 line-clamp-2 min-h-[3rem] cursor-pointer hover:text-primary transition-colors"
                        onClick={() => {
                          navigateToProduct(product.id);
                          onClose();
                        }}
                      >
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm">{product.rating}</span>
                          <span className="ml-1 text-xs text-muted-foreground">
                            ({product.reviews})
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
                        size="sm"
                        onClick={() => {
                          addToCart(product);
                          toast.success(`${product.name} agregado al carrito`);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Agregar
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
