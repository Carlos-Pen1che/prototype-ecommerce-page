import { ChevronLeft, Award, Users, Zap, Heart, Shield, Headphones } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useApp } from "../contexts/AppContext";

export function AboutPage() {
  const { goBack } = useApp();

  const values = [
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Solo trabajamos con las mejores marcas del mercado gaming"
    },
    {
      icon: Zap,
      title: "Envío Rápido",
      description: "Entregas en 24-48 horas en la mayoría de productos"
    },
    {
      icon: Shield,
      title: "Garantía Extendida",
      description: "Todos nuestros productos incluyen garantía oficial"
    },
    {
      icon: Heart,
      title: "Pasión Gamer",
      description: "Somos gamers, sabemos lo que necesitas"
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Más de 50,000 gamers confían en nosotros"
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      description: "Atención personalizada cuando la necesites"
    },
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
          <h1 className="text-4xl mb-4">Sobre GameTech Store</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tu tienda especializada en gaming e informática desde 2020. 
            Más que una tienda, somos una comunidad de gamers apasionados.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl mb-4">Nuestra Historia</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  GameTech Store nació en 2020 con una visión clara: crear la mejor experiencia de compra 
                  para gamers y entusiastas de la tecnología en toda Latinoamérica.
                </p>
                <p>
                  Comenzamos como un pequeño proyecto entre amigos gamers que no encontraban una tienda 
                  que realmente entendiera sus necesidades. Hoy, somos la tienda de referencia con más 
                  de 50,000 clientes satisfechos.
                </p>
                <p>
                  Nuestro compromiso es simple: ofrecer los mejores productos, al mejor precio, con el 
                  mejor servicio. Porque cuando compras con nosotros, no solo estás adquiriendo un producto, 
                  estás uniéndote a una comunidad que comparte tu pasión.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-2xl text-center mb-8">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary/5 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl mb-2">50K+</p>
              <p className="text-sm text-muted-foreground">Clientes Satisfechos</p>
            </div>
            <div>
              <p className="text-4xl mb-2">1000+</p>
              <p className="text-sm text-muted-foreground">Productos</p>
            </div>
            <div>
              <p className="text-4xl mb-2">24/7</p>
              <p className="text-sm text-muted-foreground">Soporte</p>
            </div>
            <div>
              <p className="text-4xl mb-2">4.8★</p>
              <p className="text-sm text-muted-foreground">Calificación</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl mb-4">¿Listo para mejorar tu setup?</h2>
          <Button size="lg" onClick={goBack}>
            Explorar Productos
          </Button>
        </div>
      </div>
    </div>
  );
}
