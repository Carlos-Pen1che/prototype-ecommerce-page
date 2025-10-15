import { ShoppingCart, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-primary-foreground rounded-lg p-2">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="text-xl">GameTech Store</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Tu tienda especializada en gaming e informática. Los mejores componentes y periféricos para dominar.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Ayuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Devoluciones</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4">Categorías</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">PCs Gaming</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Componentes</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Periféricos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Monitores</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Consolas</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Recibe ofertas exclusivas y noticias sobre los últimos lanzamientos gaming.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Tu email" className="flex-1" />
              <Button>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 GameTech Store. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
              <a href="#" className="hover:text-foreground transition-colors">Términos</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}