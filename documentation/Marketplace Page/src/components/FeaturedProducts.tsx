import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const featuredProducts = [
  {
    id: 1,
    name: "Headset Gaming RGB Pro",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1673669236244-60f764c15f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBoZWFkc2V0JTIwbWljcm9waG9uZXxlbnwxfHx8fDE3NTg4NzI5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isNew: false,
    discount: 24
  },
  {
    id: 2,
    name: "PC Gaming RTX 4080 Beast",
    price: 2299.99,
    originalPrice: 2699.99,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1704871132546-d1d3b845ae65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMFBDJTIwUkdCfGVufDF8fHx8MTc1ODg5NzYzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isNew: true,
    discount: 15
  },
  {
    id: 3,
    name: "GeForce RTX 4070 Ti",
    price: 799.99,
    originalPrice: 899.99,
    rating: 4.7,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1757356747708-f11f10dbda7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljcyUyMGNhcmQlMjBHUFUlMjBSVFh8ZW58MXx8fHwxNzU4ODk3NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isNew: false,
    discount: 11
  },
  {
    id: 4,
    name: "Silla Gaming RGB Elite",
    price: 459.99,
    originalPrice: 599.99,
    rating: 4.6,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1608511271453-7b293dc27bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjaGFpciUyMFJHQiUyMGxpZ2h0c3xlbnwxfHx8fDE3NTg4OTc2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isNew: false,
    discount: 23
  },
  {
    id: 5,
    name: "Monitor Curvo 32\" 4K 144Hz",
    price: 549.99,
    originalPrice: 699.99,
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1637053598206-0ee15774ec05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yJTIwdWx0cmF3aWRlJTIwY3VydmVkfGVufDF8fHx8MTc1ODg5NzY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isNew: true,
    discount: 21
  },
  {
    id: 6,
    name: "Kit Teclado + Mouse RGB",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMGtleWJvYXJkJTIwUkdCfGVufDF8fHx8MTc1ODg5NzYzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isNew: false,
    discount: 25
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Lo más popular en Gaming</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Los productos más vendidos y mejor valorados por la comunidad gamer
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({product.reviews} reseñas)
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
                
                <Button className="w-full group/btn">
                  <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                  Agregar al carrito
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver todos los productos
          </Button>
        </div>
      </div>
    </section>
  );
}