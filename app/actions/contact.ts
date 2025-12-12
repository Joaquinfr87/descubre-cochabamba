'use server'

import prisma from '@/lib/prisma'

export async function submitContact(formData: FormData) {
    const name = formData.get('name') as string
    const lastname = formData.get('lastname') as string
    const fullName = `${name} ${lastname || ''}`.trim()
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!email || !message) {
        return { success: false, error: 'Faltan campos requeridos' }
    }

    try {
        await prisma.contactSubmission.create({
            data: {
                name: fullName || 'Anonymous',
                email,
                message,
            },
        })
        return { success: true }
    } catch (error) {
        console.error('Error submitting contact form:', error)
        return { success: false, error: 'Error al guardar en la base de datos' }
    }
}
