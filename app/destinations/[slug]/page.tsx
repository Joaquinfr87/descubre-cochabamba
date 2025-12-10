import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Check, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import destinations from "@/data/destinations.json";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// This function generates the static params for export if needed, 
// but for dynamic rendering it's not strictly required unless we want static optimization.
export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug }  = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={destination.imageUrl}
          alt={destination.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-white/80 font-medium tracking-widest uppercase mb-4">Destino Turístico</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">{destination.title}</h1>
          <div className="flex items-center gap-2 text-xl text-white/90">
            <MapPin className="h-6 w-6 text-primary" />
            {destination.location}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sobre este destino</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {destination.description}
                {/* Placeholder for more extended lore/content */}
                <br /><br />
                Cochabamba, el corazón de Bolivia, ofrece una diversidad única. {destination.title} representa una de las joyas más preciadas de nuestra región. Prepárate para una experiencia inolvidable.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Lo que vivirás</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/20 border border-secondary/30">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Placeholder */}
            <div>
                <h3 className="text-2xl font-bold mb-6">Galería</h3>
                <div className="grid grid-cols-2 gap-4 h-64">
                    <div className="relative rounded-xl overflow-hidden bg-muted">
                        <Image src={destination.imageUrl} alt="Gallery 1" fill className="object-cover" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden bg-muted">
                         {/* Using same image for demo, in real app would be different images */}
                        <Image src={destination.imageUrl} alt="Gallery 2" fill className="object-cover sepia" />
                    </div>
                </div>
            </div>
          </div>

          {/* Sidebar Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-xl border-none ring-1 ring-black/5 bg-card">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Precio estimado desde</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">$150</span>
                      <span className="text-muted-foreground">/ persona</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="h-5 w-5 text-secondary-foreground" />
                        <span>Disponibilidad todo el año</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Users className="h-5 w-5 text-secondary-foreground" />
                        <span>Grupos de 2 a 12 personas</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button className="w-full h-12 text-lg font-semibold" size="lg">
                      Reservar Ahora
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Solicitar más información
                    </Button>
                  </div>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    * Precios sujetos a temporada y disponibilidad.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
