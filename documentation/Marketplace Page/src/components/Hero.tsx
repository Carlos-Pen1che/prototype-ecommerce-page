import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container px-4 py-24 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-6xl mb-6">
              Eleva tu experiencia gamer al siguiente nivel
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Descubre los mejores PCs gaming, componentes de alta gama y periféricos profesionales. Todo lo que necesitas para dominar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="group">
                Ver PCs Gaming
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Explorar Componentes
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1704871132546-d1d3b845ae65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMFBDJTIwUkdCfGVufDF8fHx8MTc1ODg5NzYzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Setup gaming con PC RGB"
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-green-400 text-black px-4 py-2 rounded-full transform rotate-12 shadow-lg">
              <span className="font-bold">¡RTX 4090!</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-700/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-700/20 to-transparent"></div>
    </section>
  );
}