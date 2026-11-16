'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient();

    const email = (formData.get('email') as string | null)?.trim() ?? ''
    const password = (formData.get('password') as string | null)?.trim() ?? ''

    if (!email || !password) {
        redirect('/login?message=' + encodeURIComponent('Te rugăm să introduci email-ul și parola.'))
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect('/login?message=' + encodeURIComponent('Email sau parolă incorectă.'))
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}