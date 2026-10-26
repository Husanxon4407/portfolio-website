import { useState } from 'react'
import { translations } from '../../data/translations.js'
import { publicImageUrl } from '../../lib/supabaseConfig.js'
import Section from '../Section/Section.jsx'
import Lightbox from '../Lightbox/Lightbox.jsx'

function Gallery({ darkMode, language, items }) {
    const t = translations[language].gallery
    const labels = translations[language].lightbox
    const [openIndex, setOpenIndex] = useState(null)

    const describe = (item) =>
        [item.caption, item.event].filter(Boolean).join(' — ') || t.label

    const images = items.map((item) => ({
        src: publicImageUrl(item.image_path),
        alt: describe(item),
        caption: describe(item),
    }))

    return (
        <Section
            id="gallery"
            darkMode={darkMode}
            label={t.label}
            titleFirst={t.titleFirst}
            titleHighlight={t.titleHighlight}
            subtitle={t.subtitle}
        >
            {/* Masonry layout with CSS columns keeps each photo's aspect ratio */}
            <ul className="m-0 list-none columns-1 gap-4 p-0 min-[480px]:columns-2 lg:columns-3 2xl:columns-4">
                {items.map((item, index) => (
                    <li key={item.id} className="mb-4 break-inside-avoid">
                        <button
                            type="button"
                            aria-label={`${labels.open}: ${describe(item)}`}
                            onClick={() => setOpenIndex(index)}
                            className={`group relative block w-full overflow-hidden rounded-2xl border p-0 ${
                                darkMode
                                    ? 'border-white/10'
                                    : 'border-indigo-600/10 shadow-sm'
                            }`}
                        >
                            <img
                                src={publicImageUrl(item.thumb_path)}
                                alt=""
                                loading="lazy"
                                className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                            />

                            {(item.caption || item.event) && (
                                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-left text-[14px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                                    {describe(item)}
                                </span>
                            )}
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

export default Gallery
