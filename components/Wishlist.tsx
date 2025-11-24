import { ChevronLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";
import { products } from "../data/products";
import { toast } from "sonner@2.0.3";

export function Wishlist() {
  const { wishlist, removeFromWishlist, goBack, navigateToProduct } = useApp();
  const { addToCart } = useCart();

  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      toast.success(`${product.name} añadido al carrito`);
    }
  };

  const handleRemoveFromWishlist = (productId: number) => {
    const product = products.find(p => p.id === productId);
    removeFromWishlist(productId);
    toast.info(`${product?.name} eliminado de favoritos`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container px-4 py-4">
          <Button variant="ghost" onClick={goBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl mb-2 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            Mis Favoritos
          </h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'producto' : 'productos'} guardados
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl mb-2">No tienes favoritos aún</h2>
            <p className="text-muted-foreground mb-6">
              Guarda productos que te interesen para revisarlos después
            </p>
            <Button onClick={goBack} size="lg">
              Explorar productos
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  {/* Product Image */}
                  <div 
                    className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4 cursor-pointer"
                    onClick={() => navigateToProduct(product.id)}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount > 0 && (
                      <Badge variant="destructive" className="absolute top-2 left-2">
                        -{product.discount}%
                      </Badge>
                    )}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 bg-white hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(product.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                    <h3 
                      className="line-clamp-2 min-h-[3rem] cursor-pointer hover:text-primary transition-colors"
                      onClick={() => navigateToProduct(product.id)}
                    >
                      {product.name}
                    </h3>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl">${product.price.toFixed(2)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Stock Badge */}
                    {product.stock < 5 && product.stock > 0 && (
                      <Badge variant="outline" className="text-orange-500 border-orange-500">
                        Solo quedan {product.stock}
                      </Badge>
                    )}
                    {product.stock === 0 && (
                      <Badge variant="destructive">
                        Sin stock
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock === 0 ? 'Sin stock' : 'Añadir al carrito'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
