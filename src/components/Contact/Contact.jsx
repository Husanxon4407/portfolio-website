import { useEffect, useState } from 'react'
import { translations } from '../../data/translations.js'
import { contacts } from '../../data/profile.js'
import Section from '../Section/Section.jsx'
import SocialIcon from '../SocialIcon/SocialIcon.jsx'

function Contact({ darkMode, language }) {
    const t = translations[language].contact
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!copied) return

        const timer = setTimeout(() => setCopied(false), 2000)

        return () => clearTimeout(timer)
    }, [copied])

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contacts.email)
            setCopied(true)
        } catch {
            // Clipboard blocked — fall back to opening the mail app
            window.location.href = `mailto:${contacts.email}`
        }
    }

    const items = [
        {
            type: 'email',
            label: t.email,
            value: contacts.email,
            href: `mailto:${contacts.email}`,
        },
        {
            type: 'phone',
            label: t.phone,
            value: contacts.phone,
            href: contacts.phoneHref,
        },
        {
            type: 'telegram',
            label: t.telegram,
            value: contacts.telegram,
            href: contacts.telegramHref,
            external: true,
        },
        {
            type: 'location',
            label: t.location,
            value: t.locationValue,
        },
    ]

    return (
        <Section
            id="contact"
            darkMode={darkMode}
            label={t.label}
            titleFirst={t.titleFirst}
            titleHighlight={t.titleHighlight}
            subtitle={t.subtitle}
        >
            <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-[1.45fr_1fr_1fr_1fr]">
                {items.map((item) => {
                    const content = (
                        <>
                            <span
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                                    darkMode
                                        ? 'bg-cyan-400/10 text-cyan-300'
                                        : 'bg-indigo-500/10 text-indigo-600'
                                }`}
                            >
                                <SocialIcon type={item.type} />
                            </span>

                            <span className="min-w-0">
                                <span
                                    className={`block text-[12px] font-bold uppercase tracking-[0.12em] ${
                                        darkMode
                                            ? 'text-slate-500'
                                            : 'text-slate-500'
                                    }`}
                                >
                                    {item.label}
                                </span>

                                <span
                                    className={`block text-[15px] font-semibold [overflow-wrap:anywhere] ${
                                        darkMode
                                            ? 'text-slate-100'
                                            : 'text-[#172554]'
                                    }`}
                                >
                                    {item.value}
                                </span>
                            </span>
                        </>
                    )

                    const boxClass = `flex h-full items-center gap-4 rounded-2xl border p-4 no-underline transition-all duration-300 sm:p-5 ${
                        darkMode
                            ? 'border-white/10 bg-white/[0.04]'
                            : 'border-indigo-600/10 bg-white/75 shadow-sm'
                    }`

                    const hoverClass = darkMode
                        ? 'hover:-translate-y-1 hover:border-cyan-400/30'
                        : 'hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-[0_14px_40px_rgba(99,102,241,0.12)]'

                    return (
                        <li key={item.type}>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    className={`${boxClass} ${hoverClass}`}
                                >
                                    {content}
                                </a>
                            ) : (
                                <div className={boxClass}>{content}</div>
                            )}
                        </li>
                    )
                })}
            </ul>

            {/* ACTIONS */}

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <a
                    href={`mailto:${contacts.email}`}
                    className={`inline-flex h-[52px] items-center justify-center gap-2 rounded-xl px-6 font-bold no-underline transition-all duration-300 hover:-translate-y-1 ${
                        darkMode
                            ? 'bg-cyan-400 text-[#07131f] hover:bg-cyan-300'
                            : 'bg-indigo-500 text-white hover:bg-indigo-600'
                    }`}
                >
                    {t.sendEmail}
                    <span aria-hidden="true">→</span>
                </a>

                <button
                    type="button"
                    onClick={copyEmail}
                    className={`inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border px-6 font-bold transition-all duration-300 hover:-translate-y-1 ${
                        darkMode
                            ? 'border-cyan-400/30 bg-transparent text-cyan-300 hover:bg-cyan-400/10'
                            : 'border-indigo-500/25 bg-white/70 text-indigo-600 hover:bg-indigo-500/5'
                    }`}
                >
                    <span aria-live="polite">
                        {copied ? `✓ ${t.copied}` : t.copyEmail}
                    </span>
                </button>
            </div>
        </Section>
    )
}

export default Contact
