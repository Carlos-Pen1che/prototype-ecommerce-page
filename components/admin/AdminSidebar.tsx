import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Users, 
  FileText, 
  Settings,
  ArrowLeftRight
} from "lucide-react";
import { Button } from "../ui/button";

interface AdminSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onExit: () => void;
}

export function AdminSidebar({ currentView, onNavigate, onExit }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventario", icon: Package },
    { id: "movements", label: "Movimientos", icon: ArrowLeftRight },
    { id: "suppliers", label: "Proveedores", icon: Users },
    { id: "reports", label: "Reportes", icon: FileText },
    { id: "settings", label: "Configuración", icon: Settings }
  ];

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl mb-1">Admin Panel</h2>
        <p className="text-sm text-muted-foreground">GameTech Store</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onExit}
        >
          Volver a la Tienda
        </Button>
      </div>
    </aside>
  );
}
