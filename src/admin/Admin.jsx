import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { isSupabaseConfigured } from '../lib/supabaseConfig.js'
import { collections } from './collections.js'
import LoginForm from './LoginForm.jsx'
import CollectionManager from './CollectionManager.jsx'
import { Button, Panel, Notice } from './ui.jsx'

function Admin({ darkMode }) {
    const [session, setSession] = useState(null)
    const [checking, setChecking] = useState(isSupabaseConfigured)
    const [activeId, setActiveId] = useState(collections[0].id)

    useEffect(() => {
        const previousTitle = document.title
        document.title = 'Admin — Husankhon Bahodirkhonov'
        return () => {
            document.title = previousTitle
        }
    }, [])

    useEffect(() => {
        if (!supabase) return

        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
            setChecking(false)
        })

        const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession)
        })

        return () => data.subscription.unsubscribe()
    }, [])

    const active = collections.find((collection) => collection.id === activeId)

    return (
        <main className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 sm:py-12">

            {/* HEADER */}

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <a
                        href="#home"
                        className={`text-[14px] font-semibold no-underline ${
                            darkMode
                                ? 'text-cyan-300'
                                : 'text-indigo-600'
                        }`}
                    >
                        ← Back to site
                    </a>

                    <h1
                        className={`m-0 mt-1 text-[30px] font-extrabold tracking-[-0.03em] sm:text-[36px] ${
                            darkMode
                                ? 'text-slate-100'
                                : 'text-[#071126]'
                        }`}
                    >
                        Admin panel
                    </h1>
                </div>

                {session && (
                    <div className="flex items-center gap-3">
                        <span
                            className={`hidden text-[14px] sm:inline ${
                                darkMode
                                    ? 'text-slate-400'
                                    : 'text-slate-500'
                            }`}
                        >
                            {session.user.email}
                        </span>

                        <Button
                            variant="secondary"
                            darkMode={darkMode}
                            onClick={() => supabase.auth.signOut()}
                        >
                            Sign out
                        </Button>
                    </div>
                )}
            </div>

            {!isSupabaseConfigured && (
                <Panel darkMode={darkMode} className="p-6">
                    <Notice tone="info">
                        Supabase isn't connected yet. Add <code>VITE_SUPABASE_URL</code> and{' '}
                        <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env.local</code> (and to the
                        GitHub repository secrets for the live site). See <code>supabase/README.md</code>.
                    </Notice>
                </Panel>
            )}

            {isSupabaseConfigured && checking && (
                <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Loading…</p>
            )}

            {isSupabaseConfigured && !checking && !session && (
                <LoginForm darkMode={darkMode} />
            )}

            {session && (
                <>
                    {/* TABS */}

                    <div
                        role="tablist"
                        aria-label="Content type"
                        className={`mb-5 inline-flex rounded-2xl border p-1 ${
                            darkMode
                                ? 'border-white/10 bg-white/5'
                                : 'border-indigo-600/10 bg-white/80'
                        }`}
                    >
                        {collections.map((collection) => {
                            const selected = collection.id === activeId

                            return (
                                <button
                                    key={collection.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={selected}
                                    onClick={() => setActiveId(collection.id)}
                                    className={`rounded-xl border-none px-4 py-2 text-[14px] font-bold transition-colors sm:px-5 ${
                                        selected
                                            ? darkMode
                                                ? 'bg-cyan-400 text-[#07131f]'
                                                : 'bg-indigo-500 text-white'
                                            : darkMode
                                                ? 'bg-transparent text-slate-300 hover:bg-white/5'
                                                : 'bg-transparent text-slate-600 hover:bg-indigo-50'
                                    }`}
                                >
                                    {collection.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Remount per tab so each starts with fresh state */}
                    <CollectionManager
                        key={active.id}
                        collection={active}
                        darkMode={darkMode}
                    />
                </>
            )}
        </main>
    )
}

export default Admin
