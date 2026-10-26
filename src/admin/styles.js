export function inputClass(darkMode) {
    return `w-full rounded-xl border px-3.5 py-2.5 text-[15px] outline-none transition-colors ${
        darkMode
            ? 'border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400'
            : 'border-indigo-600/15 bg-white text-slate-800 placeholder:text-slate-400 focus:border-indigo-500'
    }`
}
