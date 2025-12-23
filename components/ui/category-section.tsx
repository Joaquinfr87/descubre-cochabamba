"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DetailsModal from './details-modal';
import { PlusCircle } from 'lucide-react';

interface Item {
    id: string;
    title: string;
    description: string;
    extendedDescription?: string;
    imageUrl: string;
    date?: string;
    category: string;
    location?: string;
    videoUrl?: string;
    ingredients?: string[];
}

interface CategorySectionProps {
    title?: string;
    items: Item[];
    className?: string;
}

export default function CategorySection({ title, items, className = "" }: CategorySectionProps) {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    if (items.length === 0) return null;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className={`mb-12 ${className}`}>
            <DetailsModal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                item={selectedItem}
            />

            {title && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-amber-500 inline-block">
                        {title}
                    </h2>
                </motion.div>
            )}

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemAnim}
                        layoutId={`card-${item.id}`}
                        onClick={() => setSelectedItem(item)}
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-transparent hover:border-amber-200"
                    >
                        <div className="relative h-56 w-full overflow-hidden">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {item.date && (
                                <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-sm font-bold rounded-bl-lg z-10 shadow-md">
                                    {item.date}
                                </div>
                            )}

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="bg-white/90 text-amber-600 px-4 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <PlusCircle className="w-4 h-4" /> Ver Detalles
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                                {item.category}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-amber-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
