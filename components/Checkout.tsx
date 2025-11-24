import { useState } from "react";
import { ChevronLeft, CreditCard, Banknote, Building2, Check, Package, Truck, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner@2.0.3";

export function Checkout() {
  const { goBack, navigateToConfirmation } = useApp();
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.16; // IVA 16%
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.fullName || !formData.email || !formData.address) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    if (paymentMethod === "credit-card" && (!formData.cardNumber || !formData.cvv)) {
      toast.error("Por favor completa los datos de la tarjeta");
      return;
    }

    // Simular procesamiento
    toast.success("Procesando pedido...");
    setTimeout(() => {
      clearCart();
      navigateToConfirmation();
    }, 1500);
  };

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Tarjeta de Crédito/Débito",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express"
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Building2,
      description: "Paga con tu cuenta de PayPal"
    },
    {
      id: "transfer",
      name: "Transferencia Bancaria",
      icon: Banknote,
      description: "Transferencia directa a cuenta"
    },
    {
      id: "mercadopago",
      name: "Mercado Pago",
      icon: CreditCard,
      description: "Paga con Mercado Pago"
    },
    {
      id: "oxxo",
      name: "Pago en OXXO",
      icon: Package,
      description: "Genera tu ficha de pago"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container px-4 py-4">
          <Button variant="ghost" onClick={goBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Volver al carrito
          </Button>
        </div>
      </div>

      <div className="container px-4 py-8">
        <h1 className="text-3xl mb-6">Finalizar Compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Información de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Nombre Completo *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Juan Pérez"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="juan@ejemplo.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+52 555 123 4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Dirección *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Calle, número, colonia"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Ciudad"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Estado"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Código Postal</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer">
                            <method.icon className="h-5 w-5" />
                            {method.name}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Credit Card Form */}
                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="JUAN PEREZ"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Fecha de Vencimiento *</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            type="password"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">Serás redirigido a PayPal para completar tu pago de forma segura.</p>
                    </div>
                  )}

                  {paymentMethod === "transfer" && (
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <p className="text-sm">Recibirás los datos bancarios por email para realizar tu transferencia.</p>
                      <p className="text-sm text-muted-foreground">Tu pedido se procesará al confirmar el pago.</p>
                    </div>
                  )}

                  {paymentMethod === "oxxo" && (
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <p className="text-sm">Se generará una ficha de pago que podrás pagar en cualquier OXXO.</p>
                      <p className="text-sm text-muted-foreground">Válida por 3 días.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Products */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm line-clamp-2">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envío</span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        <span>${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IVA (16%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    Confirmar Pedido
                  </Button>

                  {/* Security Badges */}
                  <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Pago 100% seguro y encriptado
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Envío asegurado
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Garantía de satisfacción
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
