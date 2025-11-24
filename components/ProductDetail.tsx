import { useState } from "react";
import { ChevronLeft, Star, Heart, ShoppingCart, Truck, Shield, Package, Share2, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { useApp } from "../contexts/AppContext";
import { products } from "../data/products";
import { toast } from "sonner@2.0.3";

interface ProductDetailProps {
  productId: number;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const product = products.find(p => p.id === productId);
  const { addToCart, isInCart } = useCart();
  const { goBack, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Producto no encontrado</h2>
          <Button onClick={goBack}>Volver a la tienda</Button>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${product.name} agregado al carrito (${quantity})`);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info("Eliminado de favoritos");
    } else {
      addToWishlist(product.id);
      toast.success("Agregado a favoritos");
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="border-b">
        <div className="container px-4 py-4">
          <Button variant="ghost" onClick={goBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
                  Nuevo
                </Badge>
              )}
              {product.discount > 0 && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  -{product.discount}%
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-2">{product.rating}</span>
                  <span className="ml-2 text-muted-foreground">
                    ({product.reviews} reseñas)
                  </span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-muted-foreground">
                  Marca: <span className="text-foreground">{product.brand}</span>
                </span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <p className="text-green-600">
                  Ahorras ${(product.originalPrice - product.price).toFixed(2)} ({product.discount}% OFF)
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              {product.stock > 0 ? (
                <p className="text-green-600 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  En stock ({product.stock} disponibles)
                </p>
              ) : (
                <p className="text-red-600 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Sin stock
                </p>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span>Cantidad:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isInCart(product.id) ? "Agregar más" : "Agregar al carrito"}
              </Button>
              <Button 
                size="lg" 
                variant={inWishlist ? "default" : "outline"}
                onClick={handleWishlist}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Benefits */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p>Envío gratis</p>
                    <p className="text-sm text-muted-foreground">En compras mayores a $100</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p>Garantía extendida</p>
                    <p className="text-sm text-muted-foreground">12 meses de garantía oficial</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p>Devolución gratis</p>
                    <p className="text-sm text-muted-foreground">30 días para devolver</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="specs" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="specs">Especificaciones</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            <TabsTrigger value="questions">Preguntas</TabsTrigger>
          </TabsList>
          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-muted-foreground">Marca:</span>
                      <span className="ml-2">{product.brand}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Categoría:</span>
                      <span className="ml-2">{product.category}</span>
                    </div>
                    {product.subcategory && (
                      <div>
                        <span className="text-muted-foreground">Subcategoría:</span>
                        <span className="ml-2">{product.subcategory}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">SKU:</span>
                      <span className="ml-2">GT-{product.id.toString().padStart(6, '0')}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-muted-foreground">Calificación:</span>
                      <span className="ml-2">{product.rating}/5.0</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reseñas:</span>
                      <span className="ml-2">{product.reviews}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Stock:</span>
                      <span className="ml-2">{product.stock} unidades</span>
                    </div>
                  </div>
                </div>
                <Separator className="my-6" />
                <div>
                  <h3 className="mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center py-8">
                  Las reseñas de clientes estarán disponibles próximamente.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="questions" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center py-8">
                  Las preguntas y respuestas estarán disponibles próximamente.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card 
                  key={relatedProduct.id} 
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedProduct.discount > 0 && (
                      <Badge variant="destructive" className="absolute top-3 right-3">
                        -{relatedProduct.discount}%
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 line-clamp-2 min-h-[3rem] text-sm">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-xs">{relatedProduct.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>${relatedProduct.price}</span>
                      {relatedProduct.originalPrice > relatedProduct.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
