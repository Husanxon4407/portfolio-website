import SocialIcon from '../SocialIcon/SocialIcon.jsx'
import { translations } from '../../data/translations.js'


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
            <div className="mx-auto w-full max-w-[1520px] px-5 py-10 sm:px-6 lg:px-8 lg:py-12">

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
                        className={`mt-3 max-w-[850px] text-sm leading-6 sm:text-lg sm:leading-7 ${
                            darkMode
                                ? 'text-slate-400'
                                : 'text-slate-600'
                        }`}
                    >
                        {t.description}
                    </p>


                    {/* SOCIAL ICONS */}

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
                        className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold no-underline transition-all duration-300 sm:py-3.5 sm:text-base hover:-translate-y-1 ${
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
                    className={`mt-8 flex flex-col gap-3 border-t pt-5 text-sm leading-5 sm:flex-row sm:items-center sm:justify-between sm:text-sm sm:leading-6 ${
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