import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Edit, Plus, Minus, Package, DollarSign, Tag, User } from "lucide-react";
import { products } from "../../data/products";
import { suppliers } from "../../data/adminData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
  onEdit: (productId: number) => void;
}

export function ProductDetail({ productId, onBack, onEdit }: ProductDetailProps) {
  const [showMovementDialog, setShowMovementDialog] = useState(false);
  const [movementType, setMovementType] = useState<"entrada" | "salida">("entrada");
  const [movementQuantity, setMovementQuantity] = useState("");
  const [movementReason, setMovementReason] = useState("");

  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Producto no encontrado</p>
        <Button onClick={onBack} className="mt-4">Volver</Button>
      </div>
    );
  }

  const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
  const costPrice = product.price * 0.6;
  const sku = `SKU-${product.id.toString().padStart(4, '0')}`;

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Agotado", variant: "destructive" as const, color: "text-red-600" };
    if (stock <= 10) return { label: "Stock Bajo", variant: "secondary" as const, color: "text-yellow-600" };
    return { label: "Disponible", variant: "default" as const, color: "text-green-600" };
  };

  const status = getStockStatus(product.stock);

  const handleMovement = () => {
    const qty = parseInt(movementQuantity);
    if (isNaN(qty) || qty <= 0) {
      toast.error("Cantidad inválida");
      return;
    }

    if (movementType === "salida" && qty > product.stock) {
      toast.error("No hay suficiente stock");
      return;
    }

    if (!movementReason.trim()) {
      toast.error("Ingresa un motivo");
      return;
    }

    toast.success(
      movementType === "entrada" 
        ? `Entrada de ${qty} unidades registrada`
        : `Salida de ${qty} unidades registrada`
    );
    
    setShowMovementDialog(false);
    setMovementQuantity("");
    setMovementReason("");
  };

  const openMovementDialog = (type: "entrada" | "salida") => {
    setMovementType(type);
    setShowMovementDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver al Inventario
        </Button>
        <Button onClick={() => onEdit(productId)} className="gap-2">
          <Edit className="h-4 w-4" />
          Editar Producto
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image and Basic Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl mb-2">{product.name}</h2>
                  <Badge variant="outline" className="mb-2">{product.category}</Badge>
                  {product.subcategory && (
                    <p className="text-sm text-muted-foreground">{product.subcategory}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">Stock actual</span>
                  <span className={`text-2xl ${status.color}`}>{product.stock}</span>
                </div>
                
                <Badge variant={status.variant} className="w-full justify-center py-2">
                  {status.label}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details and Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precio de Compra</p>
                    <p className="text-xl">${costPrice.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precio de Venta</p>
                    <p className="text-xl">${product.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Package className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SKU</p>
                    <p className="text-xl">{sku}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Proveedor</p>
                    <p className="text-sm line-clamp-1">{supplier.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
              
              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Marca</span>
                  <span className="text-sm">{product.brand}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Calificación</span>
                  <span className="text-sm">{product.rating} ⭐ ({product.reviews} reseñas)</span>
                </div>
                {product.discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Descuento</span>
                    <Badge variant="destructive">{product.discount}% OFF</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Movimientos de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => openMovementDialog("entrada")}
                  className="gap-2"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  Registrar Entrada
                </Button>
                <Button
                  onClick={() => openMovementDialog("salida")}
                  className="gap-2"
                  variant="outline"
                >
                  <Minus className="h-4 w-4" />
                  Registrar Salida
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Movement Dialog */}
      <Dialog open={showMovementDialog} onOpenChange={setShowMovementDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Registrar {movementType === "entrada" ? "Entrada" : "Salida"}
            </DialogTitle>
            <DialogDescription>
              {product.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={movementQuantity}
                onChange={(e) => setMovementQuantity(e.target.value)}
                placeholder="Ingresa la cantidad"
              />
            </div>
            
            <div>
              <Label htmlFor="reason">Motivo</Label>
              <Input
                id="reason"
                value={movementReason}
                onChange={(e) => setMovementReason(e.target.value)}
                placeholder="Ej: Compra a proveedor, Venta, Ajuste..."
              />
            </div>

            {movementType === "salida" && movementQuantity && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Stock resultante: {product.stock - parseInt(movementQuantity || "0")}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMovementDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleMovement}>
              Registrar {movementType === "entrada" ? "Entrada" : "Salida"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
