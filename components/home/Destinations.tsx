"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import destinations from "@/data/destinations.json";

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Destinos <span className="text-primary">Imperdibles</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explora los lugares más icónicos de Cochabamba. Naturaleza, historia y gastronomía en un solo lugar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group border-none shadow-lg h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={dest.imageUrl}
                    alt={dest.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-1 text-sm font-medium mb-1 opacity-90">
                      <MapPin className="h-4 w-4 text-secondary" />
                      {dest.location}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow bg-card">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {dest.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow">
                    {dest.description}
                  </p>
                  <Button asChild className="w-full group/btn" variant="outline">
                    <Link href={`/destinations/${dest.slug}`}>
                      Explorar <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <Button size="lg" className="rounded-full px-8 text-lg">
                Ver todos los destinos
            </Button>
        </div>
      </div>
    </section>
  );
}
