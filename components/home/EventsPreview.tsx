"use client";

import CategorySection from "@/components/ui/category-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import eventsData from "@/data/events.json";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function EventsPreview() {
    const featuredIds = ["1", "3", "7"];
    const items = eventsData.filter((item) => featuredIds.includes(item.id));
    const displayItems = items.length === 3 ? items : eventsData.slice(0, 3);

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Festividades y <span className="text-amber-600">Cultura</span>
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        La riqueza de nuestras tradiciones en cada celebración. Vive la magia de Cochabamba.
                    </motion.p>
                </div>

                <CategorySection items={displayItems} />

                <div className="text-center mt-8">
                    <Button asChild size="lg" className="rounded-full px-8 text-lg group bg-amber-600 hover:bg-amber-700">
                        <Link href="/culture">
                            Ver Calendario de Eventos
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
