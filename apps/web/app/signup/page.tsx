import Link from 'next/link'
import { signup } from './actions'

export default async function SignupPage(props: {
  searchParams: Promise<{ message?: string; type?: string }>
}) {
  const searchParams = await props.searchParams
  const isSuccess = searchParams?.type === 'success'

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 font-sans antialiased">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
              Platforma Educațională
            </h1>
            <p className="mt-2 text-sm text-zinc-500">Creează-ți contul pentru a începe</p>
          </div>

          {searchParams?.message && (
            <div
              className={`mb-6 rounded-lg border p-4 text-sm font-medium ${isSuccess
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-600'
                }`}
            >
              {searchParams.message}
            </div>
          )}

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-zinc-700">
                  Prenume
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                  placeholder="Andrei"
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-zinc-700">
                  Nume
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                  placeholder="Popescu"
                />
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-zinc-700">Tip cont</span>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <label className="flex cursor-pointer items-center justify-center rounded-lg border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-700 has-[:checked]:border-black has-[:checked]:bg-zinc-900 has-[:checked]:text-white transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    defaultChecked
                    className="sr-only"
                  />
                  Elev
                </label>
                <label className="flex cursor-pointer items-center justify-center rounded-lg border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-700 has-[:checked]:border-black has-[:checked]:bg-zinc-900 has-[:checked]:text-white transition-colors">
                  <input type="radio" name="role" value="teacher" className="sr-only" />
                  Profesor
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                  placeholder="student@unibuc.ro"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                Parolă
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  minLength={6}
                  required
                  className="block w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              formAction={signup}
              className="mt-6 flex w-full justify-center rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors"
            >
              Creează cont
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600">
            Ai deja cont?{' '}
            <Link href="/login" className="font-semibold text-zinc-900 hover:underline">
              Intră în cont
            </Link>
          </p>
        </div>
        <div className="border-t border-zinc-100 bg-zinc-50 px-8 py-4 text-center">
          <p className="text-xs text-zinc-500">
            Prin crearea contului, ești de acord cu regulamentul de utilizare.
          </p>
        </div>
      </div>
    </div>
  )
}