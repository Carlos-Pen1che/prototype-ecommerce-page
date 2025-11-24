import { useState } from "react";
import { AdminSidebar } from "./admin/AdminSidebar";
import { AdminDashboard } from "./admin/AdminDashboard";
import { ProductList } from "./admin/ProductList";
import { ProductDetail } from "./admin/ProductDetail";
import { ProductForm } from "./admin/ProductForm";
import { Movements } from "./admin/Movements";
import { Alerts } from "./admin/Alerts";
import { Suppliers } from "./admin/Suppliers";
import { Reports } from "./admin/Reports";
import { Settings } from "./admin/Settings";

interface AdminPageProps {
  onExit: () => void;
}

type AdminView = 
  | "dashboard" 
  | "inventory" 
  | "movements" 
  | "suppliers" 
  | "reports" 
  | "settings"
  | "product-detail"
  | "product-add"
  | "product-edit"
  | "alerts";

export function AdminPage({ onExit }: AdminPageProps) {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleNavigate = (view: string) => {
    setCurrentView(view as AdminView);
    setSelectedProductId(null);
  };

  const handleViewProduct = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentView("product-detail");
  };

  const handleEditProduct = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentView("product-edit");
  };

  const handleAddProduct = () => {
    setSelectedProductId(null);
    setCurrentView("product-add");
  };

  const handleBackToInventory = () => {
    setCurrentView("inventory");
    setSelectedProductId(null);
  };

  const handleProductSave = () => {
    setCurrentView("inventory");
    setSelectedProductId(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminDashboard />;
      
      case "inventory":
        return (
          <ProductList
            onViewDetail={handleViewProduct}
            onEditProduct={handleEditProduct}
            onAddProduct={handleAddProduct}
          />
        );
      
      case "product-detail":
        return selectedProductId ? (
          <ProductDetail
            productId={selectedProductId}
            onBack={handleBackToInventory}
            onEdit={handleEditProduct}
          />
        ) : null;
      
      case "product-add":
        return (
          <ProductForm
            onBack={handleBackToInventory}
            onSave={handleProductSave}
          />
        );
      
      case "product-edit":
        return selectedProductId ? (
          <ProductForm
            productId={selectedProductId}
            onBack={handleBackToInventory}
            onSave={handleProductSave}
          />
        ) : null;
      
      case "movements":
        return <Movements />;
      
      case "alerts":
        return <Alerts onViewProduct={handleViewProduct} />;
      
      case "suppliers":
        return <Suppliers />;
      
      case "reports":
        return <Reports />;
      
      case "settings":
        return <Settings />;
      
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar 
        currentView={currentView} 
        onNavigate={handleNavigate}
        onExit={onExit}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
