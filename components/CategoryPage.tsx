import { useState, useMemo } from "react";
import { ChevronLeft, SlidersHorizontal, Grid3x3, List } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";
import { products } from "../data/products";
import { toast } from "sonner@2.0.3";

interface CategoryPageProps {
  category: string;
}

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

export function CategoryPage({ category }: CategoryPageProps) {
  const { goBack, navigateToProduct, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const { addToCart } = useCart();
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);

  // Filter products by category
  const categoryProducts = category === "Todos los productos" 
    ? products 
    : products.filter(p => p.category === category);

  // Get unique brands and subcategories
  const brands = useMemo(() => {
    const brandSet = new Set(categoryProducts.map(p => p.brand));
    return Array.from(brandSet).sort();
  }, [categoryProducts]);

  const subcategories = useMemo(() => {
    const subcatSet = new Set(
      categoryProducts
        .map(p => p.subcategory)
        .filter((s): s is string => s !== undefined)
    );
    return Array.from(subcatSet).sort();
  }, [categoryProducts]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      
      // Subcategory filter
      if (selectedSubcategories.length > 0 && product.subcategory && !selectedSubcategories.includes(product.subcategory)) return false;
      
      // Rating filter
      if (product.rating < minRating) return false;
      
      // Stock filter
      if (showOnlyInStock && product.stock === 0) return false;
      
      // Discount filter
      if (showOnlyDiscounted && product.discount === 0) return false;
      
      return true;
    });
  }, [categoryProducts, priceRange, selectedBrands, selectedSubcategories, minRating, showOnlyInStock, showOnlyDiscounted]);

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory) ? prev.filter(s => s !== subcategory) : [...prev, subcategory]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 3000]);
    setSelectedBrands([]);
    setSelectedSubcategories([]);
    setMinRating(0);
    setShowOnlyInStock(false);
    setShowOnlyDiscounted(false);
  };

  const hasActiveFilters = 
    priceRange[0] !== 0 || 
    priceRange[1] !== 3000 || 
    selectedBrands.length > 0 || 
    selectedSubcategories.length > 0 || 
    minRating > 0 || 
    showOnlyInStock || 
    showOnlyDiscounted;

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="mb-4">Rango de precio</h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={3000}
          step={50}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Brands */}
      {brands.length > 0 && (
        <>
          <div>
            <h3 className="mb-4">Marca</h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <>
          <div>
            <h3 className="mb-4">Tipo</h3>
            <div className="space-y-2">
              {subcategories.map(subcategory => (
                <div key={subcategory} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subcat-${subcategory}`}
                    checked={selectedSubcategories.includes(subcategory)}
                    onCheckedChange={() => toggleSubcategory(subcategory)}
                  />
                  <Label htmlFor={`subcat-${subcategory}`} className="cursor-pointer">
                    {subcategory}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Rating */}
      <div>
        <h3 className="mb-4">Calificación mínima</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="cursor-pointer flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                {rating}+ estrellas
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Other Filters */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={showOnlyInStock}
            onCheckedChange={(checked) => setShowOnlyInStock(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="cursor-pointer">
            Solo en stock
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="discounted"
            checked={showOnlyDiscounted}
            onCheckedChange={(checked) => setShowOnlyDiscounted(checked as boolean)}
          />
          <Label htmlFor="discounted" className="cursor-pointer">
            Solo con descuento
          </Label>
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container px-4 py-4">
          <Button variant="ghost" onClick={goBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>

      <div className="container px-4 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl mb-2">{category}</h1>
          <p className="text-muted-foreground">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'producto' : 'productos'} encontrados
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Mobile Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <Badge variant="destructive" className="ml-2">
                    {[selectedBrands.length, selectedSubcategories.length].filter(n => n > 0).length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FiltersContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="rating">Mejor valorados</SelectItem>
              <SelectItem value="newest">Más nuevos</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex gap-2 ml-auto">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden sm:block w-64 flex-shrink-0">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg">Filtros</h2>
                  {hasActiveFilters && (
                    <Badge variant="destructive">
                      {[selectedBrands.length, selectedSubcategories.length].filter(n => n > 0).length}
                    </Badge>
                  )}
                </div>
                <FiltersContent />
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid/List */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg mb-2">No se encontraron productos</p>
                <p className="text-muted-foreground mb-4">
                  Intenta ajustar los filtros
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters}>Limpiar filtros</Button>
                )}
              </div>
            ) : (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {sortedProducts.map((product) => {
                  const inWishlist = isInWishlist(product.id);
                  
                  if (viewMode === "list") {
                    return (
                      <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div 
                              className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted cursor-pointer"
                              onClick={() => navigateToProduct(product.id)}
                            >
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between gap-4 mb-2">
                                <div>
                                  <Badge variant="outline" className="mb-2">{product.subcategory || product.category}</Badge>
                                  <h3 
                                    className="line-clamp-2 cursor-pointer hover:text-primary transition-colors mb-1"
                                    onClick={() => navigateToProduct(product.id)}
                                  >
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl">${product.price}</p>
                                  {product.originalPrice > product.price && (
                                    <p className="text-sm text-muted-foreground line-through">
                                      ${product.originalPrice}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="ml-1 text-sm">{product.rating}</span>
                                  <span className="ml-1 text-xs text-muted-foreground">
                                    ({product.reviews})
                                  </span>
                                </div>
                                {product.stock > 0 ? (
                                  <Badge variant="outline" className="text-xs">En stock</Badge>
                                ) : (
                                  <Badge variant="destructive" className="text-xs">Sin stock</Badge>
                                )}
                                {product.discount > 0 && (
                                  <Badge variant="destructive" className="text-xs">-{product.discount}%</Badge>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => {
                                    addToCart(product);
                                    toast.success(`${product.name} agregado al carrito`);
                                  }}
                                  disabled={product.stock === 0}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Agregar
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant={inWishlist ? "default" : "outline"}
                                  onClick={() => {
                                    if (inWishlist) {
                                      removeFromWishlist(product.id);
                                      toast.info("Eliminado de favoritos");
                                    } else {
                                      addToWishlist(product.id);
                                      toast.success("Agregado a favoritos");
                                    }
                                  }}
                                >
                                  <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  }

                  return (
                    <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <div 
                          className="cursor-pointer"
                          onClick={() => navigateToProduct(product.id)}
                        >
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {product.isNew && (
                          <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
                            Nuevo
                          </Badge>
                        )}
                        {product.discount > 0 && (
                          <Badge variant="destructive" className="absolute top-3 right-3">
                            -{product.discount}%
                          </Badge>
                        )}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            size="icon" 
                            variant={inWishlist ? "default" : "secondary"}
                            className="h-8 w-8 rounded-full shadow-md"
                            onClick={() => {
                              if (inWishlist) {
                                removeFromWishlist(product.id);
                                toast.info("Eliminado de favoritos");
                              } else {
                                addToWishlist(product.id);
                                toast.success("Agregado a favoritos");
                              }
                            }}
                          >
                            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs mb-2">
                            {product.subcategory || product.category}
                          </Badge>
                        </div>
                        
                        <h3 
                          className="mb-2 line-clamp-2 min-h-[3rem] cursor-pointer hover:text-primary transition-colors"
                          onClick={() => navigateToProduct(product.id)}
                        >
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{product.rating}</span>
                            <span className="ml-1 text-xs text-muted-foreground">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full group/btn" 
                          size="sm"
                          onClick={() => {
                            addToCart(product);
                            toast.success(`${product.name} agregado al carrito`);
                          }}
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          {product.stock === 0 ? "Sin stock" : "Agregar"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}