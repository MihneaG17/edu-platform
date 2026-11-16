import Link from 'next/link'
import { createClient } from '../utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight">EduCode AI</span>
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Mergi la Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  Intră în cont
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Creează cont
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-800">
            Platformă educațională cu evaluare automată & AI
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Învață programare cu feedback în timp real, nu cu soluții copiate.
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Editor de cod integrat, evaluator automat pe cazuri de test, Tutor AI care oferă
            indicii logice și analiză a progresului pentru profesori.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href={user ? '/dashboard' : '/signup'}
              className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
            >
              {user ? 'Deschide Dashboard' : 'Începe acum'}
            </Link>
            {!user && (
              <Link
                href="/login"
                className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
              >
                Am deja cont
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}