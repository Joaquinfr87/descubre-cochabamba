"use client";

import { motion } from "framer-motion";

interface MotionHeaderProps {
    title: string;
    description: string;
}

export default function MotionHeader({ title, description }: MotionHeaderProps) {
    return (
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
                <motion.h2
                    className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {description}
                </motion.p>
            </div>
        </div>
    );
}
