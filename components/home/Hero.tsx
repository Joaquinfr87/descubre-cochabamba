"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsantosepulcro.co.il%2Fupload%2Fiblock%2Fdfd%2Fdfd80cbb88a9117118e075a3d6244b2f.jpg&f=1&nofb=1&ipt=ea5028a83d9786092169de43b59b278722f327c3dfa4018b9dbefb51590b0f88')", // Cristo de la Concordia
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/30">
            Bienvenido a la Llajta
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Cochabamba <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
            Te Espera
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Desde el Cristo de la Concordia hasta las selvas del Chapare. Descubre la magia del corazón de Bolivia.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button size="lg" className="rounded-full text-lg h-12 px-8 bg-primary hover:bg-primary/90 text-white border-0">
            Explorar Destinos
          </Button>
          <Button size="lg" variant="outline" className="rounded-full text-lg h-12 px-8 bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white/20 hover:text-white">
            Ver Video <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1 h-3 bg-white rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
