import { useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { Button, Panel, Notice } from './ui.jsx'
import { inputClass } from './styles.js'

function LoginForm({ darkMode }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [busy, setBusy] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setBusy(true)
        setError(null)

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

        if (signInError) setError(signInError.message)
        setBusy(false)
    }

    const labelClass = `mb-1.5 block text-[13px] font-bold ${
        darkMode
            ? 'text-slate-300'
            : 'text-slate-600'
    }`

    return (
        <Panel darkMode={darkMode} className="mx-auto max-w-[420px] p-6 sm:p-8">
            <h2
                className={`m-0 mb-5 text-[22px] font-extrabold ${
                    darkMode
                        ? 'text-slate-100'
                        : 'text-[#172554]'
                }`}
            >
                Sign in
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="admin-email" className={labelClass}>Email</label>
                    <input
                        id="admin-email"
                        type="email"
                        autoComplete="username"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={inputClass(darkMode)}
                    />
                </div>

                <div>
                    <label htmlFor="admin-password" className={labelClass}>Password</label>
                    <input
                        id="admin-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={inputClass(darkMode)}
                    />
                </div>

                {error && <Notice>{error}</Notice>}

                <Button type="submit" darkMode={darkMode} disabled={busy}>
                    {busy ? 'Signing in…' : 'Sign in'}
                </Button>
            </form>
        </Panel>
    )
}

export default LoginForm
