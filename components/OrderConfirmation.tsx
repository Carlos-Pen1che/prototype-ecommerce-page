import { CheckCircle2, Package, Truck, Home, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { useApp } from "../contexts/AppContext";

export function OrderConfirmation() {
  const { navigateToHome } = useApp();

  // Generar número de pedido aleatorio
  const orderNumber = `GT-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-950 mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl mb-2">¡Pedido Confirmado!</h1>
            <p className="text-muted-foreground">
              Gracias por tu compra. Hemos recibido tu pedido y lo estamos preparando.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Detalles del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Número de Pedido</p>
                  <p className="font-mono">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fecha</p>
                  <p>{new Date().toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Entrega Estimada</p>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <p>
                    {estimatedDelivery.toLocaleDateString('es-ES', { 
                      weekday: 'long',
                      day: 'numeric', 
                      month: 'long'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Estado del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p>Pedido Confirmado</p>
                    <p className="text-sm text-muted-foreground">Tu pedido ha sido recibido</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Ahora</p>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground">Preparando Envío</p>
                    <p className="text-sm text-muted-foreground">Empaquetando tus productos</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Pronto</p>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground">En Camino</p>
                    <p className="text-sm text-muted-foreground">Tu pedido está en tránsito</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground">Entregado</p>
                    <p className="text-sm text-muted-foreground">Tu pedido ha sido entregado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>¿Qué sigue?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Confirmación por Email</p>
                  <p className="text-sm text-muted-foreground">
                    Te hemos enviado un email con los detalles de tu pedido y el número de seguimiento.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Preparación del Pedido</p>
                  <p className="text-sm text-muted-foreground">
                    Nuestro equipo está preparando tu pedido para el envío. Recibirás actualizaciones en cada paso.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Soporte 24/7</p>
                  <p className="text-sm text-muted-foreground">
                    Si tienes alguna pregunta, nuestro equipo de soporte está disponible para ayudarte.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1" 
              size="lg"
              onClick={navigateToHome}
            >
              <Home className="h-5 w-5 mr-2" />
              Volver al Inicio
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              size="lg"
              onClick={() => window.print()}
            >
              Imprimir Confirmación
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-6 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">
              ¿Necesitas ayuda con tu pedido?
            </p>
            <p className="text-sm">
              Contáctanos en{" "}
              <a href="mailto:soporte@gametechstore.com" className="text-primary hover:underline">
                soporte@gametechstore.com
              </a>
              {" "}o al teléfono{" "}
              <a href="tel:+525551234567" className="text-primary hover:underline">
                +52 555 123 4567
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
