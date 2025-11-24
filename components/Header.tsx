import { Search, ShoppingCart, User, Menu, Heart, LogOut, Home, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useCart } from "../contexts/CartContext";
import { useApp } from "../contexts/AppContext";

interface HeaderProps {
  onLogout?: () => void;
  onSearchChange?: (value: string) => void;
  searchQuery?: string;
  onOpenAdmin?: () => void;
}

export function Header({ onLogout, onSearchChange, searchQuery = "", onOpenAdmin }: HeaderProps) {
  const { getTotalItems } = useCart();
  const { wishlist, navigateToCart, navigateToHome, navigateToWishlist, navigateToCategory, currentPage } = useApp();
  
  const cartItemCount = getTotalItems();
  const wishlistCount = wishlist.length;

  const handleCategoryClick = (category: string) => {
    navigateToCategory(category);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={navigateToHome}
        >
          <div className="bg-primary text-primary-foreground rounded-lg p-2">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">GameTech Store</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar PCs, tarjetas gráficas, periféricos..."
              className="pl-10 pr-4 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-4">
          {currentPage !== "home" && (
            <Button variant="ghost" size="icon" onClick={navigateToHome} title="Inicio">
              <Home className="h-5 w-5" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            title="Favoritos"
            onClick={navigateToWishlist}
          >
            <Heart className={`h-5 w-5 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {wishlistCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {wishlistCount}
              </Badge>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            onClick={navigateToCart}
            title="Carrito"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>
          
          {onLogout ? (
            <Button variant="ghost" size="icon" onClick={onLogout} title="Cerrar sesión">
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          )}
          
          {onOpenAdmin && (
            <Button variant="ghost" size="icon" onClick={onOpenAdmin} title="Administrar">
              <Settings className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t">
        <div className="container px-4">
          <nav className="flex items-center space-x-8 py-3">
            <button 
              onClick={() => handleCategoryClick("PCs Gaming")} 
              className="hover:text-primary transition-colors"
            >
              PCs Gaming
            </button>
            <button 
              onClick={() => handleCategoryClick("Componentes")} 
              className="hover:text-primary transition-colors"
            >
              Componentes
            </button>
            <button 
              onClick={() => handleCategoryClick("Periféricos")} 
              className="hover:text-primary transition-colors"
            >
              Periféricos
            </button>
            <button 
              onClick={() => handleCategoryClick("Monitores")} 
              className="hover:text-primary transition-colors"
            >
              Monitores
            </button>
            <button 
              onClick={() => handleCategoryClick("Consolas")} 
              className="hover:text-primary transition-colors"
            >
              Consolas
            </button>
            <button 
              onClick={() => handleCategoryClick("Streaming")} 
              className="hover:text-primary transition-colors"
            >
              Streaming
            </button>
            <button 
              onClick={() => handleCategoryClick("VR/AR")} 
              className="hover:text-primary transition-colors"
            >
              VR/AR
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}