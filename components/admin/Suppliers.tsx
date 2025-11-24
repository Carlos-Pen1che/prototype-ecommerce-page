import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Search, Plus, Phone, Mail, Package } from "lucide-react";
import { suppliers } from "../../data/adminData";

export function Suppliers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Gestión de Proveedores</h1>
          <p className="text-muted-foreground">
            {filteredSuppliers.length} proveedor{filteredSuppliers.length !== 1 ? 'es' : ''} registrado{filteredSuppliers.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Proveedor
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No se encontraron proveedores</p>
          </div>
        ) : (
          filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="mb-2">{supplier.name}</CardTitle>
                    <Badge variant="outline">
                      {supplier.productsCount} productos
                    </Badge>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground line-clamp-1">{supplier.email}</span>
                </div>
                <div className="pt-3 border-t flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Productos
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Suppliers Table (Alternative View) */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Detallada</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm">Nombre</th>
                  <th className="text-left p-4 text-sm">Teléfono</th>
                  <th className="text-left p-4 text-sm">Correo</th>
                  <th className="text-left p-4 text-sm">Productos</th>
                  <th className="text-left p-4 text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <span>{supplier.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {supplier.phone}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {supplier.email}
                    </td>
                    <td className="p-4">
                      <Badge>{supplier.productsCount} productos</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Ver Productos
                        </Button>
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Proveedores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Proveedores</p>
              <p className="text-2xl">{suppliers.length}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Productos Totales</p>
              <p className="text-2xl">
                {suppliers.reduce((sum, s) => sum + s.productsCount, 0)}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Promedio por Proveedor</p>
              <p className="text-2xl">
                {Math.round(suppliers.reduce((sum, s) => sum + s.productsCount, 0) / suppliers.length)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
