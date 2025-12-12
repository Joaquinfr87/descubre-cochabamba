"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Send } from "lucide-react";
import { submitReview } from "@/app/actions/reviews";

export default function ReviewForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rating, setRating] = useState(5);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.set('rating', rating.toString());

        try {
            const result = await submitReview(formData);
            if (result.success) {
                alert("¡Reseña enviada con éxito!");
                (e.target as HTMLFormElement).reset();
                setRating(5);
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            alert("Ocurrió un error inesperado.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Deja tu reseña</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="author">Nombre</Label>
                        <Input id="author" name="author" placeholder="Tu nombre" required />
                    </div>

                    <div className="space-y-2">
                        <Label>Calificación</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`text-2xl focus:outline-none transition-colors ${star <= rating ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                >
                                    <Star fill={star <= rating ? "currentColor" : "none"} />
                                </button>
                            ))}
                        </div>
                        <input type="hidden" name="rating" value={rating} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Tu opinión</Label>
                        <Textarea
                            id="content"
                            name="content"
                            placeholder="¿Qué te pareció Cochabamba?"
                            className="min-h-[100px]"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
                        {isSubmitting ? (
                            "Enviando..."
                        ) : (
                            <>
                                Enviar Reseña <Send className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
