import {useState, useEffect, useRef} from 'react'
import {translations} from "../../data/translations.js";



function Navbar({
                    darkMode,
                    setDarkMode,
                    language,
                    setLanguage,
                }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [languageOpen, setLanguageOpen] = useState(false)
    const desktopLanguageRef = useRef(null)
    const mobileLanguageRef = useRef(null)
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const clickedDesktopLanguage =
                desktopLanguageRef.current?.contains(event.target)

            const clickedMobileLanguage =
                mobileLanguageRef.current?.contains(event.target)

            if (!clickedDesktopLanguage && !clickedMobileLanguage) {
                setLanguageOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])
    const closeMenu = () => {
        setMenuOpen(false)
    }

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage)
        setLanguageOpen(false)
    }

    const t = translations[language]

    const navLinks = [
        { label: t.nav.home, href: '#home' },
        { label: t.nav.education, href: '#education' },
        { label: t.nav.experience, href: '#experience' },
        { label: t.nav.projects, href: '#projects' },
        { label: t.nav.certificates, href: '#certificates' },
        { label: t.nav.gallery, href: '#gallery' },
        { label: t.nav.contact, href: '#contact' },
    ]

    return (
        <nav
            className={`fixed left-0 top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-500 ${
                darkMode
                    ? 'border-white/10 bg-[#08111d]/85'
                    : 'border-indigo-600/10 bg-white/80'
            }`}
        >
            <div className="mx-auto flex h-[60px] w-full max-w-[1520px] items-center justify-between px-5 lg:px-8">

                {/* LOGO */}

                <a
                    href="#home"
                    onClick={closeMenu}
                    className={`!text-[1.8rem] !font-black tracking-[1.5px] no-underline transition-colors duration-300 ${
                        darkMode
                            ? 'text-cyan-400'
                            : 'text-indigo-600'
                    }`}
                >
                    HB<span className="text-violet-500">.</span>
                </a>

                {/* DESKTOP NAVIGATION */}

                <ul className="m-0 hidden list-none items-center gap-[30px] p-0 min-[900px]:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={`navbar-link ${
                                    darkMode
                                        ? 'dark'
                                        : ''
                                }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* DESKTOP ACTIONS */}

                <div className="hidden items-center gap-[14px] min-[900px]:flex">

                    {/* THEME */}

                    <button
                        type="button"
                        aria-label="Toggle dark mode"
                        onClick={() => setDarkMode(!darkMode)}
                        className={`flex h-[46px] w-[46px] items-center justify-center rounded-full border-none text-lg transition-all duration-300 ${
                            darkMode
                                ? 'bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                                : 'bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/15'
                        }`}
                    >
                        {darkMode ? (
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                    fill="currentColor"
                                />
                                <path
                                    d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 12.8A8.5 8.5 0 1 1 11.2 3A6.7 6.7 0 0 0 21 12.8Z"
                                    fill="currentColor"
                                />
                            </svg>
                        )}
                    </button>

                    {/* LANGUAGE */}

                    <div ref={desktopLanguageRef} className="relative">
                        <button
                            type="button"
                            aria-label="Change language"
                            onClick={() => setLanguageOpen(!languageOpen)}
                            className={`flex h-[46px] items-center gap-[10px] rounded-full border-none px-[18px] font-bold transition-all duration-300 ${
                                darkMode
                                    ? 'bg-cyan-400/10 text-slate-200 hover:bg-cyan-400/20'
                                    : 'bg-indigo-500/10 text-slate-700 hover:bg-indigo-500/15'
                            }`}
                        >
                            <span
                                className={`text-[19px] font-black leading-none ${
                                    darkMode
                                        ? 'text-cyan-300'
                                        : 'text-indigo-600'
                                }`}
                            >
                                  ◎
                            </span>

                            <span>{language}</span>

                            <span className="text-[18px] font-black leading-none">
                                {languageOpen ? '⌃' : '⌄'}
                            </span>
                        </button>

                        {languageOpen && (
                            <div
                                className={`absolute right-0 top-[54px] min-w-[110px] rounded-2xl border p-2 shadow-xl backdrop-blur-md ${
                                    darkMode
                                        ? 'border-white/10 bg-[#111c2b]/95'
                                        : 'border-indigo-600/10 bg-white/95'
                                }`}
                            >
                                {['EN', 'UZ', 'RU'].map((item) => (
                                    <button
                                        key={item}
                                        type="button"
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
                </div>

                {/* MOBILE ACTIONS */}

                <div className="flex items-center gap-2 min-[900px]:hidden">

                    {/* THEME */}

                    <button
                        type="button"
                        aria-label="Toggle dark mode"
                        onClick={() => setDarkMode(!darkMode)}
                        className={`flex h-[44px] w-[44px] items-center justify-center rounded-full border-none text-lg transition-all duration-300 ${
                            darkMode
                                ? 'bg-cyan-400/10 text-cyan-300'
                                : 'bg-indigo-500/10 text-indigo-600'
                        }`}
                    >
                        {darkMode ? (
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                    fill="currentColor"
                                />
                                <path
                                    d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 12.8A8.5 8.5 0 1 1 11.2 3A6.7 6.7 0 0 0 21 12.8Z"
                                    fill="currentColor"
                                />
                            </svg>
                        )}
                    </button>

                    {/* LANGUAGE */}

                    <div ref={mobileLanguageRef} className="relative">
                        <button
                            type="button"
                            aria-label="Change language"
                            onClick={() => setLanguageOpen(!languageOpen)}
                            className={`flex h-[44px] items-center gap-2 rounded-full border-none px-3 font-bold transition-all duration-300 ${
                                darkMode
                                    ? 'bg-cyan-400/10 text-slate-200'
                                    : 'bg-indigo-500/10 text-slate-700'
                            }`}
                        >
                            <span
                                className={`text-[19px] font-black leading-none ${
                                    darkMode
                                        ? 'text-cyan-300'
                                        : 'text-indigo-600'
                                }`}
                            >
                                 ◎
                            </span>

                            <span>{language}</span>

                            <span className="text-[18px] font-black leading-none">
                                {languageOpen ? '⌃' : '⌄'}
                            </span>
                        </button>

                        {languageOpen && (
                            <div
                                className={`absolute right-0 top-[52px] min-w-[100px] rounded-2xl border p-2 shadow-xl ${
                                    darkMode
                                        ? 'border-white/10 bg-[#111c2b]/95'
                                        : 'border-indigo-600/10 bg-white/95'
                                }`}
                            >
                                {['EN', 'UZ', 'RU'].map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => changeLanguage(item)}
                                        className={`block w-full rounded-xl border-none px-3 py-2 text-left font-semibold ${
                                            language === item
                                                ? darkMode
                                                    ? 'bg-cyan-400/10 text-cyan-300'
                                                    : 'bg-indigo-500/10 text-indigo-600'
                                                : darkMode
                                                    ? 'bg-transparent text-slate-300'
                                                    : 'bg-transparent text-slate-700'
                                        }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* HAMBURGER */}

                    <button
                        type="button"
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`flex h-[44px] w-[44px] items-center justify-center rounded-full border-none transition-all duration-300 ${
                            darkMode
                                ? 'bg-cyan-400/10 text-cyan-300'
                                : 'bg-indigo-500/10 text-indigo-600'
                        }`}
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}

            {menuOpen && (
                <div
                    className={`border-t px-5 py-5 shadow-lg backdrop-blur-md min-[900px]:hidden ${
                        darkMode
                            ? 'border-white/10 bg-[#08111d]/95'
                            : 'border-indigo-600/10 bg-white/95'
                    }`}
                >
                    <ul className="m-0 flex list-none flex-col gap-1 p-0">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`mobile-nav-link ${
                                        darkMode
                                            ? 'text-slate-300 hover:bg-cyan-400/10 hover:text-cyan-300'
                                            : ''
                                    }`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar