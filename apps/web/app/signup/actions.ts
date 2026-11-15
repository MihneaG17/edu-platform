'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error("🔥 EROARE SUPABASE:", error) // <-- ADAUGĂ LINIA ASTA
    
        if (error.code === 'user_already_exists') {
        redirect('/signup?message=Acest email este deja înregistrat. Te rugăm să te loghezi.')
        }
    }

    redirect('/signup?message=Cont creat cu succes!')
}