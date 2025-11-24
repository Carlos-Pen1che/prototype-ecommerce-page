import { ChevronLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { useApp } from "../contexts/AppContext";
import { toast } from "sonner@2.0.3";

export function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { goBack, navigateToProduct, navigateToCheckout } = useApp();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 100 ? 0 : 15;
  const finalTotal = totalPrice + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }
    navigateToCheckout();
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
          <h1 className="text-3xl mb-2">Carrito de compras</h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} en tu carrito
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">
              Agrega productos para comenzar tu compra
            </p>
            <Button onClick={goBack} size="lg">
              Ir a la tienda
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div 
                        className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted cursor-pointer"
                        onClick={() => navigateToProduct(item.id)}
                      >
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4 mb-2">
                          <div>
                            <h3 
                              className="line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                              onClick={() => navigateToProduct(item.id)}
                            >
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.brand} - {item.category}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeFromCart(item.id);
                              toast.info("Producto eliminado del carrito");
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                if (item.quantity < item.stock) {
                                  updateQuantity(item.id, item.quantity + 1);
                                } else {
                                  toast.error(`Solo hay ${item.stock} unidades disponibles`);
                                }
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                            {item.originalPrice > item.price && (
                              <p className="text-sm text-muted-foreground line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Stock Warning */}
                        {item.quantity >= item.stock && (
                          <Badge variant="destructive" className="mt-2">
                            Stock máximo alcanzado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Clear Cart Button */}
              <Button
                variant="outline"
                onClick={() => {
                  clearCart();
                  toast.success("Carrito vaciado");
                }}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Vaciar carrito
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        <span>${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    {totalPrice > 0 && totalPrice < 100 && (
                      <p className="text-sm text-muted-foreground">
                        Agrega ${(100 - totalPrice).toFixed(2)} más para envío gratis
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>

                  {/* Savings */}
                  {cart.some(item => item.originalPrice > item.price) && (
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Ahorras $
                        {cart.reduce((total, item) => 
                          total + (item.originalPrice - item.price) * item.quantity, 0
                        ).toFixed(2)}
                        {' '}en este pedido
                      </p>
                    </div>
                  )}

                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceder al pago
                  </Button>

                  <Button variant="outline" className="w-full" onClick={goBack}>
                    Continuar comprando
                  </Button>

                  {/* Trust Badges */}
                  <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      ✓ Pago seguro encriptado
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ Envío en 24-48 horas
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ Devolución en 30 días
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}