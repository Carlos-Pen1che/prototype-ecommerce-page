import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { TrendingUp, DollarSign, Package, Download, BarChart3, PieChart } from "lucide-react";
import { products } from "../../data/products";
import { dashboardStats, topSellingProducts } from "../../data/adminData";

export function Reports() {
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Reportes e Indicadores</h1>
          <p className="text-muted-foreground">
            Análisis detallado del inventario y operaciones
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Reporte
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Total Inventario</p>
                <p className="text-2xl">${(totalInventoryValue / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unidades Totales</p>
                <p className="text-2xl">{totalStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Precio Promedio</p>
                <p className="text-2xl">${averagePrice.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Productos Únicos</p>
                <p className="text-2xl">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Productos Más Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingProducts.map((product, index) => {
                const maxRevenue = Math.max(...topSellingProducts.map(p => p.revenue));
                const percentage = (product.revenue / maxRevenue) * 100;
                
                return (
                  <div key={product.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <span className="text-sm line-clamp-1">{product.name}</span>
                      </div>
                      <span className="text-sm">${product.revenue.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.sales} unidades vendidas
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribución por Categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats.topCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{category.value} productos</span>
                      <Badge variant="outline">{category.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Inventario por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm">Categoría</th>
                  <th className="text-left p-4 text-sm">Productos</th>
                  <th className="text-left p-4 text-sm">Stock Total</th>
                  <th className="text-left p-4 text-sm">Valor Inventario</th>
                  <th className="text-left p-4 text-sm">Precio Promedio</th>
                  <th className="text-left p-4 text-sm">Estado</th>
                </tr>
              </thead>
              <tbody>
                {dashboardStats.topCategories.map((category) => {
                  const categoryProducts = products.filter(p => p.category === category.name);
                  const categoryStock = categoryProducts.reduce((sum, p) => sum + p.stock, 0);
                  const categoryValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
                  const categoryAvgPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length;
                  const lowStockCount = categoryProducts.filter(p => p.stock <= 10).length;
                  
                  return (
                    <tr key={category.name} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <span className="">{category.name}</span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {category.value}
                      </td>
                      <td className="p-4">
                        {categoryStock}
                      </td>
                      <td className="p-4">
                        ${categoryValue.toLocaleString()}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        ${categoryAvgPrice.toFixed(2)}
                      </td>
                      <td className="p-4">
                        {lowStockCount > 0 ? (
                          <Badge variant="secondary">{lowStockCount} con stock bajo</Badge>
                        ) : (
                          <Badge variant="default">Óptimo</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/50">
                  <td className="p-4">TOTAL</td>
                  <td className="p-4">{products.length}</td>
                  <td className="p-4">{totalStock}</td>
                  <td className="p-4">${totalInventoryValue.toLocaleString()}</td>
                  <td className="p-4">${averagePrice.toFixed(2)}</td>
                  <td className="p-4">-</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stock Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Estado de Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-green-700">Stock Disponible</p>
                <Badge className="bg-green-600">
                  {products.filter(p => p.stock > 10).length}
                </Badge>
              </div>
              <p className="text-2xl text-green-900">
                {((products.filter(p => p.stock > 10).length / products.length) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-green-600 mt-1">del inventario</p>
            </div>

            <div className="p-6 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-yellow-700">Stock Bajo</p>
                <Badge className="bg-yellow-600">
                  {products.filter(p => p.stock > 0 && p.stock <= 10).length}
                </Badge>
              </div>
              <p className="text-2xl text-yellow-900">
                {((products.filter(p => p.stock > 0 && p.stock <= 10).length / products.length) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-yellow-600 mt-1">requiere atención</p>
            </div>

            <div className="p-6 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-red-700">Agotado</p>
                <Badge className="bg-red-600">
                  {products.filter(p => p.stock === 0).length}
                </Badge>
              </div>
              <p className="text-2xl text-red-900">
                {((products.filter(p => p.stock === 0).length / products.length) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-red-600 mt-1">sin stock</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
