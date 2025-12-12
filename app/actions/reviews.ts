'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export async function submitReview(formData: FormData) {
    const author = formData.get('author') as string
    const rating = parseInt(formData.get('rating') as string)
    const content = formData.get('content') as string

    if (!author || isNaN(rating) || !content) {
        return { success: false, error: 'Faltan campos requeridos' }
    }

    try {
        await prisma.review.create({
            data: {
                author,
                rating,
                content,
            },
        })
        revalidatePath('/reviews')
        return { success: true }
    } catch (error) {
        console.error('Error submitting review:', error)
        return { success: false, error: 'Error al guardar la reseña' }
    }
}

export async function getRandomReviews(limit: number = 3) {
    try {
        // Using raw query for random ordering in Postgres
        // Need to cast the result or use a helper to ensure types if strict
        // But for now returning whatever it gives (usually array of objects)
        const reviews = await prisma.$queryRaw`SELECT * FROM "Review" ORDER BY RANDOM() LIMIT ${limit}`
        return reviews as any[]
    } catch (error) {
        console.error('Error fetching random reviews:', error)
        return []
    }
}
