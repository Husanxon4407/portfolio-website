import { translations } from '../../data/translations.js'
function SocialIcon({ type }) {
    if (type === 'telegram') {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M21.4 3.5 2.9 10.7c-1.3.5-1.3 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.1.9.6.9.4 0 .6-.2.8-.4l2.3-2.2 4.8 3.5c.9.5 1.5.3 1.7-.8l3.1-15.7c.3-1.3-.5-1.9-1.1-1.6ZM8.1 13.4l10.8-6.8c.5-.3.9-.1.5.2l-8.8 7.9-.3 3.1-1.1-3.5-2.7-.9c-.6-.2-.6-.5.1-.8Z" />
            </svg>
        )
    }

    if (type === 'instagram') {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
            >
                <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
                <circle cx="12" cy="12" r="4" />
                <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                />
            </svg>
        )
    }

    if (type === 'linkedin') {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M5.2 8.2A2.2 2.2 0 1 0 5.2 3.8a2.2 2.2 0 0 0 0 4.4ZM3.3 20.2h3.8V9.8H3.3v10.4ZM9.3 9.8h3.7v1.4h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.7v5.2h-3.8v-4.6c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.7H9.3V9.8Z" />
            </svg>
        )
    }

    if (type === 'github') {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M12 2.2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2.2Z" />
            </svg>
        )
    }

    return (
        <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
        </svg>
    )
}


function Footer({ darkMode, language }) {
    const t = translations[language].footer

    const socialLinks = [
        {
            type: 'telegram',
            label: 'Telegram',
            href: 'https://t.me/bh_s_t',
        },
        {
            type: 'instagram',
            label: 'Instagram',
            href: 'https://www.instagram.com/bh_s_t',
        },
        {
            type: 'linkedin',
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/husanxon-bahodirxonov-16256b3a8',
        },
        {
            type: 'github',
            label: 'GitHub',
            href: 'https://github.com/Husanxon4407',
        },
        {
            type: 'email',
            label: 'Email',
            href: 'mailto:canikissyou4407@gmail.com',
        },
    ]

    return (
        <footer
            id="contact"
            className={`relative border-t transition-colors duration-500 ${
                darkMode
                    ? 'border-white/10 bg-[#08111d]/90 text-slate-200'
                    : 'border-indigo-600/10 bg-white/60 text-slate-700'
            }`}
        >
            <div className="mx-auto w-full max-w-[1520px] px-5 py-16 lg:px-8 lg:py-20">

                {/* MAIN FOOTER CONTENT */}

                <div className="flex flex-col items-center text-center">

                    <h2
                        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
                            darkMode
                                ? 'text-slate-100'
                                : 'text-slate-800'
                        }`}
                    >
                        {t.title}
                    </h2>

                    <p
                        className={`mt-5 max-w-[850px] text-base leading-7 sm:text-lg ${
                            darkMode
                                ? 'text-slate-400'
                                : 'text-slate-600'
                        }`}
                    >
                        {t.description}
                    </p>


                    {/* SOCIAL ICONS */}

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.type}
                                href={link.href}
                                target={link.type === 'email' ? undefined : '_blank'}
                                rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
                                aria-label={link.label}
                                title={link.label}
                                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                                    darkMode
                                        ? 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300'
                                        : 'border-indigo-600/10 bg-white/70 text-slate-600 shadow-sm hover:border-indigo-500/20 hover:bg-indigo-500/5 hover:text-indigo-600'
                                }`}
                            >
                                <SocialIcon type={link.type} />
                            </a>
                        ))}
                    </div>


                    {/* BACK TO TOP */}

                    <a
                        href="#home"
                        className={`mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold no-underline transition-all duration-300 hover:-translate-y-1 ${
                            darkMode
                                ? 'bg-cyan-400 text-[#07131f] hover:bg-cyan-300'
                                : 'bg-indigo-500 text-white hover:bg-indigo-600'
                        }`}
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 19V5" />
                            <path d="m6 11 6-6 6 6" />
                        </svg>

                        <span>{t.backToTop}</span>
                    </a>
                </div>


                {/* FOOTER BOTTOM */}

                <div
                    className={`mt-12 flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between ${
                        darkMode
                            ? 'border-white/10 text-slate-500'
                            : 'border-indigo-600/10 text-slate-500'
                    }`}
                >
                    <p className="m-0 text-center sm:text-left">
                        {t.copyright}
                    </p>

                    <p className="m-0 text-center sm:text-right">
                        {t.credit}
                    </p>
                </div>

            </div>
        </footer>
    )
}

export default Footer