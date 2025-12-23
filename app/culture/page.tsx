import fs from 'fs';
import path from 'path';
import CategorySection from '@/components/ui/category-section';
import MotionHeader from '@/components/ui/motion-header';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cultura y Eventos en Cochabamba',
    description: 'Festivales, ferias y tradiciones que dan vida a la llajta.',
};

async function getEventsData() {
    const filePath = path.join(process.cwd(), 'data', 'events.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function CulturePage() {
    const events = await getEventsData();

    // Group items by category
    const festivales = events.filter((item: any) => item.category === 'Festivales');
    const ferias = events.filter((item: any) => item.category === 'Ferias');
    const tradiciones = events.filter((item: any) => item.category === 'Tradiciones');

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-32 pb-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <MotionHeader
                        title="Cultura y Eventos"
                        description="Sumérgete en la riqueza cultural de Cochabamba. Desde festivales vibrantes hasta tradiciones ancestrales."
                    />
                    <CategorySection title="Festivales" items={festivales} />
                    <CategorySection title="Ferias" items={ferias} />
                    <CategorySection title="Tradiciones" items={tradiciones} />
                </div>
            </div>
            <Footer />
        </main>
    );
}
