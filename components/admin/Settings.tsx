import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Save, Bell, Shield, Database, Mail } from "lucide-react";

export function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Configuración</h1>
        <p className="text-muted-foreground">
          Administra las preferencias del sistema
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Configuración General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="storeName">Nombre de la Tienda</Label>
            <Input id="storeName" defaultValue="GameTech Store" />
          </div>
          <div>
            <Label htmlFor="storeEmail">Email de Contacto</Label>
            <Input id="storeEmail" type="email" defaultValue="info@gametechstore.com" />
          </div>
          <div>
            <Label htmlFor="currency">Moneda</Label>
            <Input id="currency" defaultValue="MXN" />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Alertas de Stock Bajo</p>
              <p className="text-xs text-muted-foreground">Recibe notificaciones cuando el stock sea bajo</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Productos Agotados</p>
              <p className="text-xs text-muted-foreground">Notificar cuando un producto se agote</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Nuevos Pedidos</p>
              <p className="text-xs text-muted-foreground">Alertas de pedidos nuevos</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Reporte Diario</p>
              <p className="text-xs text-muted-foreground">Enviar resumen diario por email</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Configuración de Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="emailFrom">Email Remitente</Label>
            <Input id="emailFrom" type="email" placeholder="noreply@gametechstore.com" />
          </div>
          <div>
            <Label htmlFor="emailAdmin">Email Administrador</Label>
            <Input id="emailAdmin" type="email" placeholder="admin@gametechstore.com" />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Autenticación de Dos Factores</p>
              <p className="text-xs text-muted-foreground">Requiere código adicional al iniciar sesión</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Registro de Actividad</p>
              <p className="text-xs text-muted-foreground">Mantener historial de acciones</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <Button variant="outline" size="sm">
            Cambiar Contraseña
          </Button>
        </CardContent>
      </Card>

      {/* Inventory Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Inventario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="minStock">Stock Mínimo por Defecto</Label>
            <Input id="minStock" type="number" defaultValue="10" />
            <p className="text-xs text-muted-foreground mt-1">
              Valor predeterminado para alertas de stock bajo
            </p>
          </div>
          <div>
            <Label htmlFor="autoSku">Formato de SKU</Label>
            <Input id="autoSku" defaultValue="SKU-####" disabled />
            <p className="text-xs text-muted-foreground mt-1">
              Formato automático para nuevos productos
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Actualización Automática de Stock</p>
              <p className="text-xs text-muted-foreground">Reducir stock automáticamente al vender</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Los cambios se guardarán en el sistema
            </p>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
