import { ChevronLeft, Package, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useApp } from "../contexts/AppContext";

export function ReturnsPage() {
  const { goBack, navigateToContact } = useApp();

  const returnSteps = [
    {
      number: "1",
      title: "Contacta con nosotros",
      description: "Envíanos un email o llámanos dentro de los 30 días posteriores a la recepción del producto."
    },
    {
      number: "2",
      title: "Obtén tu número de autorización",
      description: "Te proporcionaremos un número de autorización de devolución (RMA) y las instrucciones de envío."
    },
    {
      number: "3",
      title: "Empaca el producto",
      description: "Empaca el producto en su caja original con todos los accesorios y documentación."
    },
    {
      number: "4",
      title: "Envía el producto",
      description: "Envía el producto a la dirección que te proporcionamos usando el método de envío que prefieras."
    },
    {
      number: "5",
      title: "Recibe tu reembolso",
      description: "Una vez que recibamos y verifiquemos el producto, procesaremos tu reembolso en 5-7 días hábiles."
    }
  ];

  const conditions = [
    {
      icon: CheckCircle,
      title: "Aceptamos devoluciones si:",
      items: [
        "El producto está en su empaque original y sin abrir",
        "Incluye todos los accesorios y manuales",
        "No tiene signos de uso o daño",
        "Se solicita dentro de los 30 días",
        "Tienes el comprobante de compra"
      ],
      variant: "success" as const
    },
    {
      icon: XCircle,
      title: "No aceptamos devoluciones si:",
      items: [
        "El producto fue usado o instalado",
        "El empaque está dañado o incompleto",
        "Pasaron más de 30 días desde la compra",
        "Es un producto personalizado o bajo pedido",
        "El producto fue dañado por mal uso"
      ],
      variant: "error" as const
    }
  ];

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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Política de Devoluciones</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tu satisfacción es nuestra prioridad. Conoce nuestra política de devoluciones y garantías.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl mb-1">30 Días</p>
              <p className="text-sm text-muted-foreground">Para devolver tu producto</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl mb-1">100%</p>
              <p className="text-sm text-muted-foreground">Reembolso completo</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl mb-1">Fácil</p>
              <p className="text-sm text-muted-foreground">Proceso simple</p>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl mb-6 text-center">Proceso de Devolución</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {returnSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conditions */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl mb-6 text-center">Condiciones de Devolución</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conditions.map((condition, index) => (
              <Card key={index} className={condition.variant === "error" ? "border-red-200 dark:border-red-900" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <condition.icon className={`h-5 w-5 ${
                      condition.variant === "success" ? "text-green-600" : "text-red-600"
                    }`} />
                    {condition.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {condition.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Guarantees Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl mb-6 text-center">Garantías</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Garantía del Fabricante
                </h3>
                <p className="text-sm text-muted-foreground ml-7">
                  Todos nuestros productos incluyen la garantía oficial del fabricante. 
                  El periodo varía según el producto (generalmente 1-3 años). 
                  La garantía cubre defectos de fabricación y mal funcionamiento.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Garantía de Satisfacción GameTech
                </h3>
                <p className="text-sm text-muted-foreground ml-7">
                  Además de la garantía del fabricante, ofrecemos nuestra garantía de satisfacción de 30 días. 
                  Si no estás completamente satisfecho con tu compra, puedes devolverla para un reembolso completo.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Exclusiones de Garantía
                </h3>
                <p className="text-sm text-muted-foreground ml-7">
                  La garantía no cubre daños por mal uso, accidentes, modificaciones no autorizadas, 
                  desgaste normal, o daños causados por factores externos como líquidos o sobretensión eléctrica.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Refund Information */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>Información sobre Reembolsos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Tiempo de Procesamiento</p>
                  <p className="text-sm text-muted-foreground">
                    Los reembolsos se procesan en 5-7 días hábiles después de recibir el producto devuelto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Método de Reembolso</p>
                  <p className="text-sm text-muted-foreground">
                    El reembolso se realizará al método de pago original utilizado en la compra.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Costos de Envío</p>
                  <p className="text-sm text-muted-foreground">
                    Los costos de envío de devolución son responsabilidad del cliente, 
                    excepto en casos de productos defectuosos o errores en el pedido.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl mb-2">¿Necesitas iniciar una devolución?</h2>
          <p className="text-muted-foreground mb-6">
            Contáctanos y te guiaremos en el proceso
          </p>
          <Button size="lg" onClick={navigateToContact}>
            Contactar Soporte
          </Button>
        </div>
      </div>
    </div>
  );
}
