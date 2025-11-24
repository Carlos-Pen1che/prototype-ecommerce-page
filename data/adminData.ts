// Datos administrativos para el sistema de inventario

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  email: string;
  productsCount: number;
}

export interface Movement {
  id: number;
  date: string;
  productId: number;
  productName: string;
  type: "entrada" | "salida";
  quantity: number;
  responsible: string;
  reason: string;
}

export interface AdminProduct {
  id: number;
  name: string;
  category: string;
  sku: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  supplierId: number;
  status: "disponible" | "stock-bajo" | "agotado";
  lastUpdate: string;
  image: string;
  description: string;
}

export const suppliers: Supplier[] = [
  {
    id: 1,
    name: "TechDistribuidora S.A.",
    phone: "+52 55 1234 5678",
    email: "ventas@techdist.com",
    productsCount: 145
  },
  {
    id: 2,
    name: "Componentes Globales",
    phone: "+52 55 8765 4321",
    email: "contacto@compglobal.com",
    productsCount: 89
  },
  {
    id: 3,
    name: "Gaming Pro Supply",
    phone: "+52 55 9876 5432",
    email: "info@gamingpro.com",
    productsCount: 67
  },
  {
    id: 4,
    name: "Periféricos Mexico",
    phone: "+52 55 3456 7890",
    email: "ventas@perifmx.com",
    productsCount: 103
  },
  {
    id: 5,
    name: "Console Masters",
    phone: "+52 55 2345 6789",
    email: "info@consolemasters.com",
    productsCount: 45
  }
];

export const movements: Movement[] = [
  {
    id: 1,
    date: "2024-01-20 14:30",
    productId: 4,
    productName: "GeForce RTX 4090",
    type: "entrada",
    quantity: 10,
    responsible: "Juan Pérez",
    reason: "Compra a proveedor"
  },
  {
    id: 2,
    date: "2024-01-20 12:15",
    productId: 8,
    productName: "Headset Gaming RGB Pro",
    type: "salida",
    quantity: 3,
    responsible: "María García",
    reason: "Venta a cliente"
  },
  {
    id: 3,
    date: "2024-01-19 16:45",
    productId: 1,
    productName: "PC Gaming RTX 4080 Beast",
    type: "salida",
    quantity: 2,
    responsible: "Carlos López",
    reason: "Venta a cliente"
  },
  {
    id: 4,
    date: "2024-01-19 10:20",
    productId: 26,
    productName: "Intel Core i9-14900K",
    type: "entrada",
    quantity: 15,
    responsible: "Ana Martínez",
    reason: "Reposición de stock"
  },
  {
    id: 5,
    date: "2024-01-18 15:30",
    productId: 13,
    productName: "Monitor Curvo 32\" 4K 144Hz",
    type: "salida",
    quantity: 5,
    responsible: "Luis Hernández",
    reason: "Venta corporativa"
  },
  {
    id: 6,
    date: "2024-01-18 11:00",
    productId: 30,
    productName: "SSD NVMe 2TB Gen4",
    type: "entrada",
    quantity: 25,
    responsible: "Juan Pérez",
    reason: "Compra a proveedor"
  },
  {
    id: 7,
    date: "2024-01-17 14:20",
    productId: 10,
    productName: "Kit Teclado + Mouse RGB",
    type: "salida",
    quantity: 8,
    responsible: "María García",
    reason: "Venta a cliente"
  },
  {
    id: 8,
    date: "2024-01-17 09:45",
    productId: 21,
    productName: "Meta Quest 3",
    type: "entrada",
    quantity: 12,
    responsible: "Carlos López",
    reason: "Nueva línea de productos"
  },
  {
    id: 9,
    date: "2024-01-16 16:15",
    productId: 18,
    productName: "PlayStation 5 Digital",
    type: "salida",
    quantity: 4,
    responsible: "Ana Martínez",
    reason: "Venta a cliente"
  },
  {
    id: 10,
    date: "2024-01-16 13:30",
    productId: 5,
    productName: "GeForce RTX 4080",
    type: "entrada",
    quantity: 8,
    responsible: "Luis Hernández",
    reason: "Reposición de stock"
  }
];

// Stats para el dashboard
export const dashboardStats = {
  totalProducts: 70,
  lowStock: 12,
  outOfStock: 3,
  totalValue: 2456789.50,
  recentMovements: 45,
  topCategories: [
    { name: "Componentes", value: 35, percentage: 50 },
    { name: "Periféricos", value: 18, percentage: 26 },
    { name: "Monitores", value: 8, percentage: 11 },
    { name: "Consolas", value: 5, percentage: 7 },
    { name: "Otros", value: 4, percentage: 6 }
  ],
  salesTrend: [
    { month: "Ago", sales: 145000 },
    { month: "Sep", sales: 189000 },
    { month: "Oct", sales: 234000 },
    { month: "Nov", sales: 298000 },
    { month: "Dic", sales: 456000 },
    { month: "Ene", sales: 387000 }
  ]
};

export const topSellingProducts = [
  { id: 4, name: "GeForce RTX 4090", sales: 156, revenue: 249599.44 },
  { id: 1, name: "PC Gaming RTX 4080 Beast", sales: 89, revenue: 204719.11 },
  { id: 8, name: "Headset Gaming RGB Pro", sales: 324, revenue: 61555.76 },
  { id: 13, name: "Monitor Curvo 32\" 4K 144Hz", sales: 203, revenue: 111647.97 },
  { id: 26, name: "Intel Core i9-14900K", sales: 145, revenue: 85548.55 }
];
