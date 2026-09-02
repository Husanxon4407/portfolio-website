import { useState } from 'react'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <nav className="fixed left-0 top-0 z-50 w-full border-b border-indigo-600/10 bg-white/80 backdrop-blur-md">

            <div className="mx-auto flex h-[60px] w-full max-w-[1520px] items-center justify-between px-5 lg:px-8">

                {/* ================================
                    LOGO
                ================================= */}

                <a
                    href="#home"
                    onClick={closeMenu}
                    className="text-[1.8rem] font-extrabold tracking-[1px] text-indigo-600 no-underline"
                >
                    HB<span className="text-violet-500">.</span>
                </a>


                {/* ================================
                    DESKTOP NAVIGATION
                ================================= */}

                <ul className="hidden list-none items-center gap-[30px] p-0 m-0 min-[900px]:flex">

                    <li>
                        <a href="#home" className="navbar-link">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="#education" className="navbar-link">
                            Education
                        </a>
                    </li>

                    <li>
                        <a href="#experience" className="navbar-link">
                            Experience
                        </a>
                    </li>

                    <li>
                        <a href="#projects" className="navbar-link">
                            Projects
                        </a>
                    </li>

                    <li>
                        <a href="#certificates" className="navbar-link">
                            Certificates
                        </a>
                    </li>

                    <li>
                        <a href="#gallery" className="navbar-link">
                            Gallery
                        </a>
                    </li>

                    <li>
                        <a href="#contact" className="navbar-link">
                            Contact
                        </a>
                    </li>

                </ul>


                {/* ================================
                    DESKTOP ACTIONS
                ================================= */}

                <div className="hidden items-center gap-[14px] min-[900px]:flex">

                    <button
                        type="button"
                        aria-label="Toggle dark mode"
                        className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-none bg-indigo-500/10 text-indigo-600 shadow-[0_8px_24px_rgba(99,102,241,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500/15 hover:shadow-[0_14px_32px_rgba(99,102,241,0.15)]"
                    >
                        ☾
                    </button>

                    <button
                        type="button"
                        aria-label="Change language"
                        className="flex h-[46px] items-center gap-[10px] rounded-full border-none bg-indigo-500/10 px-[18px] font-semibold text-slate-700 shadow-[0_8px_24px_rgba(99,102,241,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500/15 hover:shadow-[0_14px_32px_rgba(99,102,241,0.15)]"
                    >
                        <span className="text-indigo-600">◎</span>
                        <span>EN</span>
                        <span className="text-xs">⌄</span>
                    </button>

                </div>


                {/* ================================
                     MOBILE ACTIONS
                 ================================= */}

                <div className="flex items-center gap-2 min-[900px]:hidden">

                    {/* Dark Mode */}
                    <button
                        type="button"
                        aria-label="Toggle dark mode"
                        className="flex h-[44px] w-[44px] items-center justify-center rounded-full border-none bg-indigo-500/10 text-indigo-600 transition-all duration-300"
                    >
                        ☾
                    </button>


                    {/* Language */}
                    <button
                        type="button"
                        aria-label="Change language"
                        className="flex h-[44px] items-center gap-2 rounded-full border-none bg-indigo-500/10 px-3 font-semibold text-slate-700 transition-all duration-300"
                    >
                        <span className="text-indigo-600">◎</span>
                        <span>EN</span>
                        <span className="text-xs">⌄</span>
                    </button>


                    {/* Hamburger */}
                    <button
                        type="button"
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-[44px] w-[44px] items-center justify-center rounded-full border-none bg-indigo-500/10 text-indigo-600 transition-all duration-300"
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>

                </div>

            </div>


            {/* ================================
                MOBILE MENU
            ================================= */}

            {menuOpen && (
                <div className="border-t border-indigo-600/10 bg-white/95 px-5 py-5 shadow-lg backdrop-blur-md min-[900px]:hidden">

                    <ul className="m-0 flex list-none flex-col gap-1 p-0">

                        <li>
                            <a
                                href="#home"
                                onClick={closeMenu}
                                className="mobile-nav-link"
                            >
                                Home
                            </a>
                        </li>

                        <li>
                            <a
                                href="#education"
                                onClick={closeMenu}
                                className="mobile-nav-link"
                            >
                                Education
                            </a>
                        </li>

                        <li>
                            <a
                                href="#experience"
                                onClick={closeMenu}
                                className="mobile-nav-link"
                            >
                                Experience
                            </a>
                        </li>

                        <li>
                            <a
                                href="#projects"
                                onClick={closeMenu}
                                className="mobile-nav-link"
                            >
                                Projects
                            </a>
                        </li>

                        <li>
                            <a
                                href="#certificates"
                                onClick={closeMenu}
                                className="mobile-nav-link"
                            >
                                Certificates
                            </a>
                        </li>

                        <li>
                            <a
                                href="#gallery"
                                onClick={closeMenu}
                                className="mobile-nav-link"
                            >
                                Gallery
                            </a>
                        </li>

                        <li>
                            <a
                                href="#contact"
                                onClick={closeMenu}
                                className="mobile-nav-link"
                            >
                                Contact
                            </a>
                        </li>

                    </ul>

                </div>
            )}

        </nav>
    )
}

export default Navbar