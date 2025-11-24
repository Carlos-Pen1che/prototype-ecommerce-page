import { ChevronLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useApp } from "../contexts/AppContext";
import { toast } from "sonner@2.0.3";
import { useState } from "react";

export function ContactPage() {
  const { goBack } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensaje enviado. Te responderemos pronto.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "soporte@gametechstore.com",
      link: "mailto:soporte@gametechstore.com"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+52 555 123 4567",
      link: "tel:+525551234567"
    },
    {
      icon: MapPin,
      title: "Dirección",
      content: "Av. Insurgentes Sur 1234, CDMX, México",
      link: "https://maps.google.com"
    },
    {
      icon: Clock,
      title: "Horario",
      content: "Lun - Vie: 9:00 - 20:00, Sáb: 10:00 - 18:00",
      link: null
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
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Contáctanos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes preguntas? Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info) => (
              <Card key={info.title}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{info.title}</p>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="hover:text-primary transition-colors"
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p>{info.content}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-primary/5">
              <CardContent className="p-6">
                <h3 className="mb-2">Soporte 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Nuestro equipo de soporte está disponible las 24 horas del día, 
                  los 7 días de la semana para ayudarte con cualquier consulta.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
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
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-5 w-5 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <div className="mt-6 p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-3">
                ¿Buscas respuestas rápidas? Consulta nuestras preguntas frecuentes
              </p>
              <Button variant="outline" onClick={() => {}}>
                Ver FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
