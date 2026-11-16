import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { signout } from '../login/actions'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user }, } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, role, xp_points, current_streak')
        .eq('id', user.id)
        .single()
    const isTeacher = profile?.role === 'teacher'
    const fullName =
        [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || user.email
    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
            <header className="border-b border-zinc-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-bold tracking-tight">EduCode AI</span>
                        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200">
                            {isTeacher ? 'Profesor' : 'Elev'}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-zinc-600">{fullName}</span>
                        <form action={signout}>
                            <button
                                type="submit"
                                className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
                            >
                                Deconectare
                            </button>
                        </form>
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-6xl px-6 py-10">
                <h1 className="text-2xl font-bold tracking-tight">
                    Salut, {profile?.first_name || 'utilizator'}!
                </h1>
                <p className="mt-1 text-sm text-zinc-500">
                    {isTeacher
                        ? 'Gestionează clasele, problemele și analizele de performanță ale elevilor.'
                        : 'Intră într-o clasă cu codul de invitație și rezolvă problemele asignate.'}
                </p>
                {isTeacher ? (
                    <div className="mt-8 grid gap-6 sm:grid-cols-3">
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <h2 className="font-semibold">Clasele mele</h2>
                            <p className="mt-2 text-sm text-zinc-500">
                                Aici vei putea crea clase noi și genera coduri de invitație. (Pasul 2)
                            </p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <h2 className="font-semibold">Probleme & Teste</h2>
                            <p className="mt-2 text-sm text-zinc-500">
                                Adaugă enunțuri, limite de timp/memorie și cazuri de test I/O. (Pasul 2)
                            </p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <h2 className="font-semibold">Analiză AI clasă</h2>
                            <p className="mt-2 text-sm text-zinc-500">
                                Statistici agregate cu punctele vulnerabile ale elevilor. (Pasul 5)
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-8 grid gap-6 sm:grid-cols-3">
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <p className="text-xs font-medium uppercase text-zinc-500">Experiență</p>
                            <p className="mt-2 text-3xl font-bold">{profile?.xp_points ?? 0} XP</p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <p className="text-xs font-medium uppercase text-zinc-500">Streak curent</p>
                            <p className="mt-2 text-3xl font-bold">{profile?.current_streak ?? 0} zile</p>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <h2 className="font-semibold">Clase & Teme</h2>
                            <p className="mt-2 text-sm text-zinc-500">
                                Înscrierea cu cod de clasă și lista problemelor vin în Pasul 2.
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}