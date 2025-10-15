import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground rounded-lg p-2">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">GameTech Store</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar PCs, tarjetas gráficas, periféricos..."
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              2
            </Badge>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t">
        <div className="container px-4">
          <nav className="flex items-center space-x-8 py-3">
            <a href="#" className="hover:text-primary transition-colors">
              PCs Gaming
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Componentes
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Periféricos
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Consolas
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Streaming
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              VR/AR
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}