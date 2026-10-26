import { useEffect, useRef, useState } from 'react'

const LANGUAGES = ['EN', 'UZ', 'RU']

function LanguageSwitcher({ darkMode, language, setLanguage, compact = false }) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        if (!open) return

        const handleOutsideClick = (event) => {
            if (!containerRef.current?.contains(event.target)) {
                setOpen(false)
            }
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [open])

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage)
        setOpen(false)
    }

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                aria-label="Change language"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className={`flex items-center rounded-full border-none font-bold transition-all duration-300 ${
                    compact
                        ? 'h-[44px] gap-2 px-3'
                        : 'h-[46px] gap-[10px] px-[18px]'
                } ${
                    darkMode
                        ? 'bg-cyan-400/10 text-slate-200 hover:bg-cyan-400/20'
                        : 'bg-indigo-500/10 text-slate-700 hover:bg-indigo-500/15'
                }`}
            >
                <span
                    aria-hidden="true"
                    className={`text-[19px] font-black leading-none ${
                        darkMode
                            ? 'text-cyan-300'
                            : 'text-indigo-600'
                    }`}
                >
                    ◎
                </span>

                <span>{language}</span>

                <span aria-hidden="true" className="text-[18px] font-black leading-none">
                    {open ? '⌃' : '⌄'}
                </span>
            </button>

            {open && (
                <div
                    role="listbox"
                    aria-label="Language"
                    className={`absolute right-0 rounded-2xl border p-2 shadow-xl backdrop-blur-md ${
                        compact
                            ? 'top-[52px] min-w-[100px]'
                            : 'top-[54px] min-w-[110px]'
                    } ${
                        darkMode
                            ? 'border-white/10 bg-[#111c2b]/95'
                            : 'border-indigo-600/10 bg-white/95'
                    }`}
                >
                    {LANGUAGES.map((item) => (
                        <button
                            key={item}
                            type="button"
                            role="option"
                            aria-selected={language === item}
                            onClick={() => changeLanguage(item)}
                            className={`block w-full rounded-xl border-none px-4 py-2.5 text-left font-semibold transition-colors ${
                                language === item
                                    ? darkMode
                                        ? 'bg-cyan-400/10 text-cyan-300'
                                        : 'bg-indigo-500/10 text-indigo-600'
                                    : darkMode
                                        ? 'bg-transparent text-slate-300 hover:bg-white/5'
                                        : 'bg-transparent text-slate-700 hover:bg-indigo-500/5'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSwitcher
