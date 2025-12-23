"use client";

import CategorySection from "@/components/ui/category-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import gastronomyData from "@/data/gastronomy.json";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function GastronomyPreview() {
    const items = gastronomyData
        .filter((item) => item.category === "Platos Típicos")
        .slice(0, 3);

    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Nuestra <span className="text-amber-600">Gastronomía</span>
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Sabores únicos que conquistan paladares. Descubre los platos bandera de Cochabamba.
                    </motion.p>
                </div>

                <CategorySection items={items} />

                <div className="text-center mt-8">
                    <Button asChild size="lg" className="rounded-full px-8 text-lg group bg-amber-600 hover:bg-amber-700">
                        <Link href="/gastronomy">
                            Ver Menú Completo
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
