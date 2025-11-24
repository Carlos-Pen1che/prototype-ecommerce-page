import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { products } from "../../data/products";
import { suppliers } from "../../data/adminData";
import { toast } from "sonner@2.0.3";

interface ProductFormProps {
  productId?: number;
  onBack: () => void;
  onSave: () => void;
}

export function ProductForm({ productId, onBack, onSave }: ProductFormProps) {
  const isEdit = productId !== undefined;
  const product = isEdit ? products.find(p => p.id === productId) : null;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    subcategory: product?.subcategory || "",
    description: product?.description || "",
    brand: product?.brand || "",
    costPrice: product ? (product.price * 0.6).toFixed(2) : "",
    salePrice: product?.price.toString() || "",
    stock: product?.stock.toString() || "",
    minStock: "10",
    sku: product ? `SKU-${product.id.toString().padStart(4, '0')}` : "",
    supplierId: "1",
    imageUrl: product?.image || ""
  });

  const categories = [
    "PCs Gaming",
    "Componentes",
    "Periféricos",
    "Monitores",
    "Consolas",
    "VR/AR",
    "Streaming"
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.name.trim()) {
      toast.error("El nombre es requerido");
      return;
    }

    if (!formData.category) {
      toast.error("Selecciona una categoría");
      return;
    }

    if (!formData.salePrice || parseFloat(formData.salePrice) <= 0) {
      toast.error("El precio de venta es inválido");
      return;
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      toast.error("El stock es inválido");
      return;
    }

    toast.success(isEdit ? "Producto actualizado exitosamente" : "Producto agregado exitosamente");
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button type="button" variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div>
              <h1 className="text-3xl">
                {isEdit ? "Editar Producto" : "Agregar Producto"}
              </h1>
              <p className="text-muted-foreground">
                {isEdit ? "Modifica la información del producto" : "Completa los datos del nuevo producto"}
              </p>
            </div>
          </div>
          <Button type="submit" className="gap-2">
            <Save className="h-4 w-4" />
            Guardar
          </Button>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Upload */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Imagen del Producto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.imageUrl ? (
                  <div className="relative">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => handleChange("imageUrl", "")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-12 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Arrastra una imagen o haz clic para seleccionar
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Seleccionar Imagen
                    </Button>
                  </div>
                )}

                <div>
                  <Label htmlFor="imageUrl">URL de la Imagen</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => handleChange("imageUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre del Producto *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Ej: GeForce RTX 4090"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoría *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subcategory">Subcategoría</Label>
                    <Input
                      id="subcategory"
                      value={formData.subcategory}
                      onChange={(e) => handleChange("subcategory", e.target.value)}
                      placeholder="Ej: Tarjetas Gráficas"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="brand">Marca *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleChange("brand", e.target.value)}
                    placeholder="Ej: NVIDIA"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe las características del producto..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing and Stock */}
            <Card>
              <CardHeader>
                <CardTitle>Precios e Inventario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="costPrice">Precio de Compra *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="costPrice"
                        type="number"
                        step="0.01"
                        value={formData.costPrice}
                        onChange={(e) => handleChange("costPrice", e.target.value)}
                        className="pl-7"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="salePrice">Precio de Venta *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="salePrice"
                        type="number"
                        step="0.01"
                        value={formData.salePrice}
                        onChange={(e) => handleChange("salePrice", e.target.value)}
                        className="pl-7"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stock">Stock Inicial *</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => handleChange("stock", e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="minStock">Stock Mínimo</Label>
                    <Input
                      id="minStock"
                      type="number"
                      min="0"
                      value={formData.minStock}
                      onChange={(e) => handleChange("minStock", e.target.value)}
                      placeholder="10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Se generará una alerta cuando el stock sea menor
                    </p>
                  </div>
                </div>

                {formData.costPrice && formData.salePrice && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Margen de ganancia: </span>
                      <span className="font-medium">
                        ${(parseFloat(formData.salePrice) - parseFloat(formData.costPrice)).toFixed(2)}
                        {" "}
                        ({((parseFloat(formData.salePrice) - parseFloat(formData.costPrice)) / parseFloat(formData.costPrice) * 100).toFixed(1)}%)
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles Adicionales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">Código SKU</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleChange("sku", e.target.value)}
                      placeholder="SKU-0001"
                      disabled={isEdit}
                    />
                    {isEdit && (
                      <p className="text-xs text-muted-foreground mt-1">
                        El SKU no puede modificarse
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="supplier">Proveedor</Label>
                    <Select value={formData.supplierId} onValueChange={(value) => handleChange("supplierId", value)}>
                      <SelectTrigger id="supplier">
                        <SelectValue placeholder="Selecciona un proveedor" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map(supplier => (
                          <SelectItem key={supplier.id} value={supplier.id.toString()}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button type="button" variant="outline" onClick={onBack}>
                Cancelar
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                {isEdit ? "Actualizar Producto" : "Crear Producto"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
