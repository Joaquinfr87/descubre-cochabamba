"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Mensaje enviado con éxito!");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contáctanos</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ¿Tienes preguntas sobre tu próximo viaje a Cochabamba? Estamos aquí para ayudarte a planificar una experiencia inolvidable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Información de Contacto</h3>
              
              <Card className="border-none shadow-md bg-secondary/10">
                <CardContent className="flex items-start gap-4 p-6">
                  <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-lg">Nuestra Oficina</h4>
                    <p className="text-muted-foreground">Av. Heroínas 123, Edificio Tunari</p>
                    <p className="text-muted-foreground">Cochabamba, Bolivia</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-secondary/10">
                <CardContent className="flex items-start gap-4 p-6">
                  <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-lg">Llámanos</h4>
                    <p className="text-muted-foreground">+591 4 4123456</p>
                    <p className="text-muted-foreground">+591 712 34567 (WhatsApp)</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-secondary/10">
                <CardContent className="flex items-start gap-4 p-6">
                  <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-lg">Escríbenos</h4>
                    <p className="text-muted-foreground">info@descubrecochabamba.bo</p>
                    <p className="text-muted-foreground">reservas@descubrecochabamba.bo</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 rounded-xl overflow-hidden relative bg-muted flex items-center justify-center border border-border">
              <div className="absolute inset-0 bg-secondary/10" />
              <MapPin className="h-12 w-12 text-primary/50" />
              <span className="sr-only">Mapa de ubicación</span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Apellido</Label>
                      <Input id="lastname" placeholder="Tu apellido" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tucorreo@ejemplo.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto</Label>
                    <Input id="subject" placeholder="¿En qué podemos ayudarte?" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Escribe tu mensaje aquí..." 
                      className="min-h-[150px]" 
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
