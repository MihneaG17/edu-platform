import Link from 'next/link'
import { login } from './actions'

export default async function LoginPage(props: {
    searchParams: Promise<{ message?: string }>
}) {
    const searchParams = await props.searchParams

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 font-sans antialiased">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200">
                <div className="p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                            Bine ai revenit
                        </h1>
                        <p className="mt-2 text-sm text-zinc-500">Autentifică-te în Platforma Educațională</p>
                    </div>

                    {searchParams?.message && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                            {searchParams.message}
                        </div>
                    )}

                    <form className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                                Email academic
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                                placeholder="student@unibuc.ro"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                                Parolă
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            formAction={login}
                            className="mt-6 flex w-full justify-center rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 transition-colors"
                        >
                            Intră în cont
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-600">
                        Nu ai cont?{' '}
                        <Link href="/signup" className="font-semibold text-zinc-900 hover:underline">
                            Creează unul aici
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}