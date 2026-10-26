import { useState } from 'react'
import { translations } from '../../data/translations.js'
import { publicImageUrl } from '../../lib/supabaseConfig.js'
import Section from '../Section/Section.jsx'
import Lightbox from '../Lightbox/Lightbox.jsx'

const formatDate = (value, language) => {
    if (!value) return null
    const locale = { EN: 'en-GB', UZ: 'uz-UZ', RU: 'ru-RU' }[language]
    return new Date(value).toLocaleDateString(locale, { month: 'short', year: 'numeric' })
}

function Certificates({ darkMode, language, items }) {
    const t = translations[language].certificates
    const labels = translations[language].lightbox
    const [openIndex, setOpenIndex] = useState(null)

    const images = items.map((item) => ({
        src: publicImageUrl(item.image_path),
        alt: item.title,
        caption: [item.title, item.issuer].filter(Boolean).join(' — '),
    }))

    return (
        <Section
            id="certificates"
            darkMode={darkMode}
            label={t.label}
            titleFirst={t.titleFirst}
            titleHighlight={t.titleHighlight}
            subtitle={t.subtitle}
        >
            <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {items.map((item, index) => (
                    <li key={item.id}>
                        <button
                            type="button"
                            aria-label={`${labels.open}: ${item.title}`}
                            onClick={() => setOpenIndex(index)}
                            className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border p-0 text-left transition-all duration-300 hover:-translate-y-1 ${
                                darkMode
                                    ? 'border-white/10 bg-white/[0.04] hover:border-cyan-400/30'
                                    : 'border-indigo-600/10 bg-white/75 shadow-sm hover:shadow-[0_18px_50px_rgba(99,102,241,0.14)]'
                            }`}
                        >
                            <div
                                className={`aspect-[4/3] w-full overflow-hidden ${
                                    darkMode
                                        ? 'bg-white/5'
                                        : 'bg-indigo-50'
                                }`}
                            >
                                <img
                                    src={publicImageUrl(item.thumb_path)}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-1 flex-col p-4">
                                <span
                                    className={`text-[15px] font-extrabold leading-snug ${
                                        darkMode
                                            ? 'text-slate-100'
                                            : 'text-[#172554]'
                                    }`}
                                >
                                    {item.title}
                                </span>

                                {(item.issuer || item.issued_on) && (
                                    <span
                                        className={`mt-1 text-[13px] ${
                                            darkMode
                                                ? 'text-slate-400'
                                                : 'text-slate-500'
                                        }`}
                                    >
                                        {[item.issuer, formatDate(item.issued_on, language)]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    </span>
                                )}
                            </div>
                        </button>
                    </li>
                ))}
            </ul>

            <Lightbox
                images={images}
                index={openIndex}
                onChange={setOpenIndex}
                onClose={() => setOpenIndex(null)}
                labels={labels}
            />
        </Section>
    )
}

export default Certificates
