"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Scroll, Utensils, PlayCircle, Clock } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: any;
}

export default function DetailsModal({ isOpen, onClose, item }: ModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!item) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl pointer-events-auto relative">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full z-10 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Hero Image */}
                            <div className="relative h-64 md:h-80 w-full">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-6 left-6 md:left-10 text-white">
                                    <span className="bg-amber-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                                        {item.category}
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-bold mt-2">{item.title}</h2>
                                </div>
                            </div>

                            {/* Content Grid */}
                            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                                {/* Main Information */}
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-primary">
                                            <Scroll className="w-5 h-5" />
                                            Historia y Detalles
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                            {item.extendedDescription || item.description}
                                        </p>
                                    </div>

                                    {/* Ingredients Section (For Recipes) */}
                                    {item.ingredients && (
                                        <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-100 dark:border-amber-900/20">
                                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-700 dark:text-amber-500">
                                                <Utensils className="w-5 h-5" />
                                                Ingredientes Principales
                                            </h3>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {item.ingredients.map((ing: string, idx: number) => (
                                                    <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                                        {ing}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Video Link */}
                                    {item.videoUrl && (
                                        <div className="pt-4">
                                            <a
                                                href={item.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg"
                                            >
                                                <PlayCircle className="w-6 h-6" />
                                                Ver Receta en YouTube
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar Info */}
                                <div className="md:col-span-1 space-y-6">
                                    <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl space-y-5">

                                        {/* Location */}
                                        {(item.location || item.category.includes("Restaurante") || item.category === "Ferias") && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" /> Ubicación
                                                </h4>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                                    {item.location || "Cochabamba, Bolivia"}
                                                </p>
                                            </div>
                                        )}

                                        {/* Date */}
                                        {item.date && (
                                            <div>
                                                <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" /> Fechas
                                                </h4>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                                    {item.date}
                                                </p>
                                            </div>
                                        )}

                                        {/* Quick Facts or Category specific info */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                                                <Clock className="w-4 h-4" /> Recomendación
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {item.category.includes("Platos") ? "Ideal para el almuerzo." :
                                                    item.category.includes("Festivales") ? "Llegar temprano para buen sitio." :
                                                        item.category.includes("Recetas") ? "Seguir paso a paso el video." :
                                                            "Consultar horarios de atención."}
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
