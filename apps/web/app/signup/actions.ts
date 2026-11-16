'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const firstName = (formData.get('first_name') as string | null)?.trim() ?? ''
    const lastName = (formData.get('last_name') as string || null)?.trim() ?? ''
    const rawRole = formData.get('role') as string | null
    const email = (formData.get('email') as string | null)?.trim() ?? ''
    const password = (formData.get('password') as string | null)?.trim() ?? ''

    if (!firstName || !lastName || !email || !password) {
        redirect('/signup?type=error&message=' + encodeURIComponent('Te rugăm să completezi toate câmpurile.'))
    }

    const role = rawRole === 'teacher' ? 'teacher' : 'student'

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                role,
            },
        },
    })

    if (error) {
        if (error.code === 'user_already_exists') {
            redirect('/signup?type=error&message=' + encodeURIComponent('Acest email este deja înregistrat. Te rugăm să te loghezi.'))
        }
        redirect('/signup?type=error&message=' + encodeURIComponent(error.message))
    }

    if (data.session) {
        redirect('/dashboard')
    }

    redirect('/signup?type=success&message=' + encodeURIComponent('Cont creat cu succes!'))
}