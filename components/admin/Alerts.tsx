import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AlertTriangle, XCircle, TrendingDown, PackagePlus } from "lucide-react";
import { products } from "../../data/products";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface AlertsProps {
  onViewProduct: (productId: number) => void;
}

export function Alerts({ onViewProduct }: AlertsProps) {
  const alerts = useMemo(() => {
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10);
    const outOfStock = products.filter(p => p.stock === 0);
    const critical = products.filter(p => p.stock <= 5);
    
    return { lowStock, outOfStock, critical };
  }, []);

  const totalAlerts = alerts.lowStock.length + alerts.outOfStock.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Alertas de Inventario</h1>
        <p className="text-muted-foreground">
          {totalAlerts} alerta{totalAlerts !== 1 ? 's' : ''} que requieren atención
        </p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Productos Agotados</p>
                <p className="text-2xl text-red-600">{alerts.outOfStock.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stock Bajo</p>
                <p className="text-2xl text-yellow-600">{alerts.lowStock.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nivel Crítico</p>
                <p className="text-2xl text-orange-600">{alerts.critical.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Out of Stock Products */}
      {alerts.outOfStock.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Productos Agotados - Acción Inmediata Requerida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.outOfStock.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 border border-red-200 rounded-lg bg-red-50">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-1 mb-1">{product.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{product.category}</Badge>
                      <Badge variant="destructive">Stock: 0</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewProduct(product.id)}
                    >
                      Ver Detalle
                    </Button>
                    <Button size="sm" className="gap-2">
                      <PackagePlus className="h-4 w-4" />
                      Reabastecer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Low Stock Products */}
      {alerts.lowStock.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <AlertTriangle className="h-5 w-5" />
              Productos con Stock Bajo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.lowStock.map((product) => {
                const isCritical = product.stock <= 5;
                
                return (
                  <div 
                    key={product.id} 
                    className={`flex items-center gap-4 p-4 border rounded-lg ${
                      isCritical 
                        ? 'border-orange-200 bg-orange-50' 
                        : 'border-yellow-200 bg-yellow-50'
                    }`}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1 mb-1">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{product.category}</Badge>
                        <Badge variant={isCritical ? "destructive" : "secondary"}>
                          Stock: {product.stock}
                        </Badge>
                        {isCritical && (
                          <Badge variant="destructive" className="bg-orange-600">
                            ¡Crítico!
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-sm text-muted-foreground mb-1">Reposición sugerida</p>
                      <p className="text-lg">
                        {Math.max(50 - product.stock, 20)} unidades
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewProduct(product.id)}
                      >
                        Ver Detalle
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <PackagePlus className="h-4 w-4" />
                        Reabastecer
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones de Reposición</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm mb-2 text-blue-900">💡 Sugerencia Automática</h3>
              <p className="text-sm text-blue-700 mb-3">
                Basado en el historial de ventas, se recomienda realizar un pedido de reposición para los siguientes productos:
              </p>
              <ul className="space-y-2 text-sm text-blue-700">
                {alerts.lowStock.slice(0, 5).map(product => (
                  <li key={product.id} className="flex items-center justify-between">
                    <span>• {product.name}</span>
                    <Badge variant="outline" className="bg-white">
                      Pedir: {Math.max(50 - product.stock, 20)} unidades
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            {alerts.outOfStock.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-sm mb-2 text-red-900">⚠️ Acción Urgente</h3>
                <p className="text-sm text-red-700">
                  Hay {alerts.outOfStock.length} producto{alerts.outOfStock.length !== 1 ? 's' : ''} completamente agotado{alerts.outOfStock.length !== 1 ? 's' : ''}.
                  Se recomienda contactar a los proveedores inmediatamente para evitar pérdida de ventas.
                </p>
              </div>
            )}

            {alerts.critical.length > 0 && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="text-sm mb-2 text-orange-900">🔔 Nivel Crítico</h3>
                <p className="text-sm text-orange-700">
                  {alerts.critical.length} producto{alerts.critical.length !== 1 ? 's' : ''} en nivel crítico (≤5 unidades).
                  Considere aumentar el stock mínimo de estos productos para evitar desabastecimiento.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
