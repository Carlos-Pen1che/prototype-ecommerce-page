import { ChevronLeft, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { useApp } from "../contexts/AppContext";
import { useState } from "react";

export function FAQPage() {
  const { goBack, navigateToContact } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Pedidos y Compras",
      questions: [
        {
          q: "¿Cómo puedo realizar un pedido?",
          a: "Para realizar un pedido, simplemente navega por nuestra tienda, añade los productos que desees al carrito y procede al checkout. Necesitarás crear una cuenta o iniciar sesión para completar tu compra."
        },
        {
          q: "¿Cómo puedo rastrear mi pedido?",
          a: "Una vez que tu pedido sea enviado, recibirás un email con un número de rastreo. También puedes ver el estado de tu pedido en la sección 'Mis Pedidos' de tu cuenta."
        },
        {
          q: "¿Puedo cancelar o modificar mi pedido?",
          a: "Puedes cancelar o modificar tu pedido dentro de las primeras 2 horas después de haberlo realizado. Contáctanos lo antes posible para ayudarte."
        },
        {
          q: "¿Emiten facturas?",
          a: "Sí, emitimos facturas electrónicas. Puedes solicitarla durante el proceso de compra o contactarnos después con tu número de pedido."
        }
      ]
    },
    {
      title: "Envíos",
      questions: [
        {
          q: "¿Cuánto tarda el envío?",
          a: "Los envíos estándar tardan entre 3-5 días hábiles. Ofrecemos envío express de 24-48 horas en productos seleccionados. Los tiempos pueden variar según tu ubicación."
        },
        {
          q: "¿Cuál es el costo de envío?",
          a: "El envío estándar tiene un costo de $15 USD. Ofrecemos envío GRATIS en compras superiores a $100 USD."
        },
        {
          q: "¿Envían a toda la república?",
          a: "Sí, realizamos envíos a todo México. También enviamos a algunos países de Latinoamérica. Verifica la disponibilidad en el checkout."
        },
        {
          q: "¿Qué paqueterías utilizan?",
          a: "Trabajamos con DHL, FedEx y Estafeta para garantizar entregas seguras y rápidas."
        }
      ]
    },
    {
      title: "Pagos",
      questions: [
        {
          q: "¿Qué métodos de pago aceptan?",
          a: "Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, transferencia bancaria, Mercado Pago y pago en efectivo en OXXO."
        },
        {
          q: "¿Es seguro pagar en línea?",
          a: "Sí, absolutamente. Utilizamos encriptación SSL de 256 bits y cumplimos con los estándares PCI DSS para proteger tu información."
        },
        {
          q: "¿Puedo pagar a meses sin intereses?",
          a: "Sí, ofrecemos planes de 3, 6, 9 y 12 meses sin intereses con tarjetas participantes. Verifica las opciones disponibles en el checkout."
        },
        {
          q: "¿Aceptan pagos en efectivo?",
          a: "Sí, puedes generar una ficha de pago para OXXO durante el checkout y pagar en efectivo en cualquier sucursal."
        }
      ]
    },
    {
      title: "Devoluciones y Garantías",
      questions: [
        {
          q: "¿Cuál es su política de devoluciones?",
          a: "Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto, siempre que esté en su empaque original y sin uso."
        },
        {
          q: "¿Cómo inicio una devolución?",
          a: "Contáctanos a través de nuestro centro de ayuda o email indicando tu número de pedido y el motivo de la devolución. Te enviaremos las instrucciones."
        },
        {
          q: "¿Los productos tienen garantía?",
          a: "Sí, todos nuestros productos cuentan con garantía del fabricante. El periodo varía según el producto (generalmente 1-3 años)."
        },
        {
          q: "¿Qué cubre la garantía?",
          a: "La garantía cubre defectos de fabricación y mal funcionamiento del producto. No cubre daños por mal uso, accidentes o desgaste normal."
        }
      ]
    },
    {
      title: "Productos",
      questions: [
        {
          q: "¿Los productos son nuevos y originales?",
          a: "Sí, todos nuestros productos son 100% nuevos y originales. Somos distribuidores autorizados de todas las marcas que vendemos."
        },
        {
          q: "¿Tienen productos en stock?",
          a: "La disponibilidad se muestra en cada producto. Si algo está agotado, puedes registrarte para recibir una notificación cuando vuelva a estar disponible."
        },
        {
          q: "¿Hacen armado de PC personalizado?",
          a: "Sí, ofrecemos servicio de armado personalizado. Contáctanos para que te asesoremos y armemos tu PC ideal."
        },
        {
          q: "¿Ofrecen asesoría técnica?",
          a: "Por supuesto. Nuestro equipo de expertos está disponible para ayudarte a elegir los productos correctos para tus necesidades."
        }
      ]
    },
    {
      title: "Cuenta y Seguridad",
      questions: [
        {
          q: "¿Es necesario crear una cuenta?",
          a: "Sí, necesitas una cuenta para realizar compras, rastrear pedidos y acceder a promociones exclusivas."
        },
        {
          q: "¿Cómo cambio mi contraseña?",
          a: "Puedes cambiar tu contraseña desde la configuración de tu cuenta o usando la opción 'Olvidé mi contraseña' en el login."
        },
        {
          q: "¿Qué hacen con mi información personal?",
          a: "Protegemos tu información y solo la usamos para procesar pedidos y mejorar tu experiencia. Lee nuestra política de privacidad para más detalles."
        },
        {
          q: "¿Puedo eliminar mi cuenta?",
          a: "Sí, puedes solicitar la eliminación de tu cuenta contactándonos. Ten en cuenta que esto es irreversible."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
          <h1 className="text-4xl mb-4">Preguntas Frecuentes</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las preguntas más comunes
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar pregunta..."
                className="pl-12 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl mb-4">{category.title}</h2>
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((item, index) => (
                        <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                          <AccordionTrigger>{item.q}</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">{item.a}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No se encontraron resultados para "{searchQuery}"
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Limpiar búsqueda
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl mb-2">¿No encontraste tu respuesta?</h2>
          <p className="text-muted-foreground mb-6">
            Nuestro equipo de soporte está listo para ayudarte
          </p>
          <Button size="lg" onClick={navigateToContact}>
            Contactar Soporte
          </Button>
        </div>
      </div>
    </div>
  );
}
