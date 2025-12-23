import fs from 'fs';
import path from 'path';
import CategorySection from '@/components/ui/category-section';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionHeader from '@/components/ui/motion-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gastronomía de Cochabamba',
    description: 'Descubre los sabores únicos de la capital gastronómica de Bolivia.',
};

async function getGastronomyData() {
    const filePath = path.join(process.cwd(), 'data', 'gastronomy.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function GastronomyPage() {
    const gastronomy = await getGastronomyData();

    // Group items by category
    const platosTipicos = gastronomy.filter((item: any) => item.category === 'Platos Típicos');
    const restaurantes = gastronomy.filter((item: any) => item.category === 'Restaurantes Recomendados');
    const recetas = gastronomy.filter((item: any) => item.category === 'Recetas / Videos');

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-32 pb-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <MotionHeader
                        title="Capital Gastronómica de Bolivia"
                        description="Cochabamba es sinónimo de buen comer. Explora nuestros platos bandera, los mejores lugares para degustarlos y aprende a prepararlos."
                    />

                    <CategorySection title="Platos Típicos" items={platosTipicos} />
                    <CategorySection title="Restaurantes Recomendados" items={restaurantes} />
                    <CategorySection title="Recetas y Videos" items={recetas} />
                </div>
            </div>
            <Footer />
        </main>
    );
}
