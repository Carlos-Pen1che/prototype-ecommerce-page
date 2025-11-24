import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Filter, ArrowUp, ArrowDown, Calendar } from "lucide-react";
import { movements } from "../../data/adminData";

export function Movements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredMovements = useMemo(() => {
    return movements.filter(movement => {
      const matchesSearch = 
        movement.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movement.responsible.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movement.reason.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === "all" || movement.type === typeFilter;
      
      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter]);

  const stats = useMemo(() => {
    const entries = movements.filter(m => m.type === "entrada").reduce((sum, m) => sum + m.quantity, 0);
    const exits = movements.filter(m => m.type === "salida").reduce((sum, m) => sum + m.quantity, 0);
    
    return {
      total: movements.length,
      entries,
      exits,
      balance: entries - exits
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Historial de Movimientos</h1>
        <p className="text-muted-foreground">
          Registro completo de entradas y salidas de inventario
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Movimientos</p>
                <p className="text-2xl">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <ArrowUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entradas</p>
                <p className="text-2xl text-green-600">+{stats.entries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <ArrowDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Salidas</p>
                <p className="text-2xl text-red-600">-{stats.exits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <ArrowUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className={`text-2xl ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.balance >= 0 ? '+' : ''}{stats.balance}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por producto, responsable o motivo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="entrada">Entradas</SelectItem>
                <SelectItem value="salida">Salidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredMovements.length} movimiento{filteredMovements.length !== 1 ? 's' : ''} encontrado{filteredMovements.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm">Fecha y Hora</th>
                  <th className="text-left p-4 text-sm">Producto</th>
                  <th className="text-left p-4 text-sm">Tipo</th>
                  <th className="text-left p-4 text-sm">Cantidad</th>
                  <th className="text-left p-4 text-sm">Responsable</th>
                  <th className="text-left p-4 text-sm">Motivo</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovements.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-muted-foreground">
                      No se encontraron movimientos
                    </td>
                  </tr>
                ) : (
                  filteredMovements.map((movement) => (
                    <tr key={movement.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="text-sm">{movement.date.split(' ')[0]}</p>
                          <p className="text-xs text-muted-foreground">{movement.date.split(' ')[1]}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="line-clamp-1 max-w-[300px]">{movement.productName}</p>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={movement.type === "entrada" ? "default" : "secondary"}
                          className={
                            movement.type === "entrada" 
                              ? "bg-green-100 text-green-700 hover:bg-green-200" 
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }
                        >
                          {movement.type === "entrada" ? (
                            <><ArrowUp className="h-3 w-3 mr-1" /> Entrada</>
                          ) : (
                            <><ArrowDown className="h-3 w-3 mr-1" /> Salida</>
                          )}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className={movement.type === "entrada" ? "text-green-600" : "text-red-600"}>
                          {movement.type === "entrada" ? "+" : "-"}{movement.quantity}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        {movement.responsible}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {movement.reason}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
