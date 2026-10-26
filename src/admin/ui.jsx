/*
 * Small styled building blocks shared by the admin screens.
 */

export function Button({ variant = 'primary', darkMode, className = '', ...props }) {
    const styles = {
        primary: darkMode
            ? 'bg-cyan-400 text-[#07131f] hover:bg-cyan-300'
            : 'bg-indigo-500 text-white hover:bg-indigo-600',
        secondary: darkMode
            ? 'border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10'
            : 'border border-indigo-600/15 bg-white text-slate-700 hover:bg-indigo-50',
        danger: 'border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20',
    }

    return (
        <button
            type="button"
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-[14px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
            {...props}
        />
    )
}

export function Panel({ darkMode, className = '', children }) {
    return (
        <div
            className={`rounded-2xl border backdrop-blur-[4px] ${
                darkMode
                    ? 'border-cyan-400/20 bg-[#08131f]/80'
                    : 'border-indigo-300/30 bg-white/85 shadow-[0_20px_70px_rgba(99,102,241,0.08)]'
            } ${className}`}
        >
            {children}
        </div>
    )
}

export function Notice({ tone = 'error', children }) {
    const tones = {
        error: 'border-rose-500/30 bg-rose-500/10 text-rose-500',
        success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
        info: 'border-sky-500/30 bg-sky-500/10 text-sky-500',
    }

    return (
        <div role={tone === 'error' ? 'alert' : 'status'} className={`rounded-xl border px-4 py-3 text-[14px] font-medium ${tones[tone]}`}>
            {children}
        </div>
    )
}
