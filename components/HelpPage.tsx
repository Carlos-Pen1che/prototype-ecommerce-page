import { ChevronLeft, Search, Package, CreditCard, Truck, RefreshCw, ShieldCheck, Headphones } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useApp } from "../contexts/AppContext";
import { useState } from "react";

export function HelpPage() {
  const { goBack, navigateToFAQ, navigateToContact, navigateToReturns } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const helpTopics = [
    {
      icon: Package,
      title: "Pedidos",
      description: "Rastrear pedidos, historial de compras",
      action: () => {}
    },
    {
      icon: CreditCard,
      title: "Pagos",
      description: "Métodos de pago, facturación",
      action: () => {}
    },
    {
      icon: Truck,
      title: "Envíos",
      description: "Tiempos de entrega, costos",
      action: () => {}
    },
    {
      icon: RefreshCw,
      title: "Devoluciones",
      description: "Política de devolución, garantías",
      action: navigateToReturns
    },
    {
      icon: ShieldCheck,
      title: "Garantías",
      description: "Información sobre garantías",
      action: () => {}
    },
    {
      icon: Headphones,
      title: "Soporte Técnico",
      description: "Ayuda con productos",
      action: navigateToContact
    },
  ];

  const popularArticles = [
    "¿Cómo rastrear mi pedido?",
    "¿Cuánto tarda el envío?",
    "Política de devoluciones",
    "Métodos de pago disponibles",
    "¿Cómo contactar con soporte?",
    "Garantía de productos",
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
          <h1 className="text-4xl mb-4">Centro de Ayuda</h1>
          <p className="text-xl text-muted-foreground mb-8">
            ¿En qué podemos ayudarte hoy?
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar en el centro de ayuda..."
                className="pl-12 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Help Topics */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl mb-6">Temas de Ayuda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpTopics.map((topic) => (
              <Card 
                key={topic.title} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={topic.action}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <topic.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl mb-6">Artículos Populares</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => {}}
                  >
                    <p className="flex items-center gap-2">
                      <span className="text-primary">→</span>
                      {article}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Ver FAQ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Encuentra respuestas a preguntas frecuentes
                </p>
                <Button variant="outline" className="w-full" onClick={navigateToFAQ}>
                  Ir al FAQ
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Contactar Soporte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Habla con nuestro equipo de soporte
                </p>
                <Button variant="outline" className="w-full" onClick={navigateToContact}>
                  Contactar
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Devoluciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Información sobre devoluciones
                </p>
                <Button variant="outline" className="w-full" onClick={navigateToReturns}>
                  Ver Política
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl mb-2">¿No encuentras lo que buscas?</h2>
          <p className="text-muted-foreground mb-6">
            Nuestro equipo de soporte está disponible 24/7 para ayudarte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={navigateToContact}>
              Contactar Soporte
            </Button>
            <Button size="lg" variant="outline" onClick={navigateToFAQ}>
              Ver FAQ Completo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
