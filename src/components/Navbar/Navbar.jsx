import {useState, useEffect} from 'react'
import {translations} from "../../data/translations.js";
import ThemeToggle from './ThemeToggle.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'


function Navbar({
                    darkMode,
                    setDarkMode,
                    language,
                    setLanguage,
                    hiddenSections = [],
                    showLinks = true,
                }) {
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        if (!menuOpen) return

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [menuOpen])

    const closeMenu = () => {
        setMenuOpen(false)
    }

    const t = translations[language]

    const allLinks = [
        { label: t.nav.home, href: '#home' },
        { label: t.nav.about, href: '#about' },
        { label: t.nav.experience, href: '#experience' },
        { label: t.nav.projects, href: '#projects' },
        { label: t.nav.skills, href: '#skills' },
        { label: t.nav.education, href: '#education' },
        { label: t.nav.certificates, href: '#certificates' },
        { label: t.nav.gallery, href: '#gallery' },
        { label: t.nav.contact, href: '#contact' },
    ]

    const navLinks = showLinks
        ? allLinks.filter((link) => !hiddenSections.includes(link.href.slice(1)))
        : []

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
                    aria-label="Husankhon Bahodirkhonov — home"
                    className={`!text-[1.8rem] !font-black tracking-[1.5px] no-underline transition-colors duration-300 ${
                        darkMode
                            ? 'text-cyan-400'
                            : 'text-indigo-600'
                    }`}
                >
                    HB<span className="text-violet-500">.</span>
                </a>

                {/* DESKTOP NAVIGATION */}

                <ul className="m-0 hidden list-none items-center gap-[26px] p-0 min-[1180px]:flex">
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

                <div className="hidden items-center gap-[14px] min-[1180px]:flex">
                    <ThemeToggle
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />

                    <LanguageSwitcher
                        darkMode={darkMode}
                        language={language}
                        setLanguage={setLanguage}
                    />
                </div>

                {/* MOBILE ACTIONS */}

                <div className="flex items-center gap-2 min-[1180px]:hidden">
                    <ThemeToggle
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        compact
                    />

                    <LanguageSwitcher
                        darkMode={darkMode}
                        language={language}
                        setLanguage={setLanguage}
                        compact
                    />

                    {/* HAMBURGER */}

                    {navLinks.length > 0 && (
                        <button
                            type="button"
                            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`flex h-[44px] w-[44px] items-center justify-center rounded-full border-none transition-all duration-300 ${
                                darkMode
                                    ? 'bg-cyan-400/10 text-cyan-300'
                                    : 'bg-indigo-500/10 text-indigo-600'
                            }`}
                        >
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    )}
                </div>
            </div>

            {/* MOBILE MENU */}

            {menuOpen && (
                <div
                    id="mobile-menu"
                    className={`border-t px-5 py-5 shadow-lg backdrop-blur-md min-[1180px]:hidden ${
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
                                            ? 'text-slate-100 hover:bg-cyan-400/10 hover:text-cyan-300'
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
