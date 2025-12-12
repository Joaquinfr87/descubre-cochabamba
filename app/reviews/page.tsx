import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReviewForm from "./review-form";
import { getRandomReviews } from "@/app/actions/reviews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export default async function ReviewsPage() {
    const randomReviews = await getRandomReviews(3);

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-32 pb-16 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Reseñas de Viajeros</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Descubre lo que otros viajeros dicen sobre su experiencia en Cochabamba.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Random Reviews List */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-semibold mb-6">Experiencias Aleatorias</h2>
                        <div className="grid gap-6">
                            {randomReviews.length > 0 ? (
                                randomReviews.map((review: any) => (
                                    <Card key={review.id} className="bg-secondary/10 border-none shadow-md">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg font-bold">{review.author}</CardTitle>
                                                    <div className="flex text-yellow-500 mt-1">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className="w-4 h-4"
                                                                fill={i < review.rating ? "currentColor" : "none"}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <Quote className="h-8 w-8 text-primary/20" />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground italic">"{review.content}"</p>
                                            <p className="text-xs text-muted-foreground/50 mt-4 text-right">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="p-8 text-center bg-muted rounded-xl">
                                    <p className="text-muted-foreground">Aún no hay reseñas. ¡Sé el primero en dejar una!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submission Form */}
                    <div>
                        <ReviewForm />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
