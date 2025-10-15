import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const categories = [
  {
    id: 1,
    name: "PCs Gaming",
    image: "https://images.unsplash.com/photo-1704871132546-d1d3b845ae65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMFBDJTIwUkdCfGVufDF8fHx8MTc1ODg5NzYzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "850+ sistemas"
  },
  {
    id: 2,
    name: "Componentes",
    image: "https://images.unsplash.com/photo-1757356747708-f11f10dbda7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljcyUyMGNhcmQlMjBHUFUlMjBSVFh8ZW58MXx8fHwxNzU4ODk3NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "2,340+ productos"
  },
  {
    id: 3,
    name: "Periféricos",
    image: "https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMGtleWJvYXJkJTIwUkdCfGVufDF8fHx8MTc1ODg5NzYzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "1,890+ productos"
  },
  {
    id: 4,
    name: "Monitores",
    image: "https://images.unsplash.com/photo-1637053598206-0ee15774ec05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb25pdG9yJTIwdWx0cmF3aWRlJTIwY3VydmVkfGVufDF8fHx8MTc1ODg5NzY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "560+ pantallas"
  },
  {
    id: 5,
    name: "Consolas",
    image: "https://images.unsplash.com/photo-1655976796204-308e6f3deaa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlJTIwY29udHJvbGxlcnxlbnwxfHx8fDE3NTg4MDQ4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "320+ productos"
  },
  {
    id: 6,
    name: "VR/AR",
    image: "https://images.unsplash.com/photo-1660100970983-645655a09b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWUiUyMGhlYWRzZXQlMjB2aXJ0dWFsJTIwcmVhbGl0eXxlbnwxfHx8fDE3NTg4NDMwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "180+ dispositivos"
  }
];

export function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Categorías Gaming & Tech</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desde PCs de alto rendimiento hasta los últimos periféricos RGB. Todo lo que necesitas para tu setup perfecto
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.itemCount}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}