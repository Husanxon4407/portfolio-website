import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { translations } from '../../data/translations.js'
import { galleryCategories } from '../../data/profile.js'
import { publicImageUrl } from '../../lib/supabaseConfig.js'
import Section from '../Section/Section.jsx'
import Lightbox from '../Lightbox/Lightbox.jsx'

const ALBUM_STYLES = [
    'from-sky-500 via-cyan-500 to-teal-400',
    'from-violet-600 via-indigo-500 to-sky-400',
    'from-indigo-600 via-blue-500 to-cyan-400',
]

function Gallery({ darkMode, language, items }) {
    const t = translations[language].gallery
    const [openAlbum, setOpenAlbum] = useState(null)

    const albums = galleryCategories.map((category, index) => ({
        ...category,
        name: t.categories[category.id],
        style: ALBUM_STYLES[index % ALBUM_STYLES.length],
        photos: items.filter((item) => item.category === category.id),
    }))

    const album = albums.find((entry) => entry.id === openAlbum)

    return (
        <Section
            id="gallery"
            darkMode={darkMode}
            label={t.label}
            titleFirst={t.titleFirst}
            titleHighlight={t.titleHighlight}
            subtitle={t.subtitle}
        >
            {/* ALBUM BUTTONS */}

            <div className="grid gap-5 sm:grid-cols-3 lg:gap-6">
                {albums.map((entry) => {
                    const cover = entry.photos[0]
                    const empty = entry.photos.length === 0

                    return (
                        <button
                            key={entry.id}
                            type="button"
                            disabled={empty}
                            onClick={() => setOpenAlbum(entry.id)}
                            className={`group relative flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-2xl border p-0 text-left transition-all duration-300 enabled:hover:-translate-y-1 disabled:cursor-default ${
                                darkMode
                                    ? 'border-white/10 enabled:hover:border-cyan-400/40'
                                    : 'border-indigo-600/10 shadow-sm enabled:hover:shadow-[0_18px_50px_rgba(99,102,241,0.18)]'
                            }`}
                        >
                            {cover ? (
                                <img
                                    src={publicImageUrl(cover.thumb_path)}
                                    alt=""
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <span
                                    aria-hidden="true"
                                    className={`absolute inset-0 bg-linear-to-br opacity-80 ${entry.style}`}
                                />
                            )}

                            <span className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

                            <span className="relative flex items-end justify-between gap-3 p-5">
                                <span>
                                    <span aria-hidden="true" className="mb-2 block text-[28px] leading-none">
                                        {entry.icon}
                                    </span>

                                    <span className="block text-[19px] font-extrabold leading-tight text-white sm:text-[18px] lg:text-[21px]">
                                        {entry.name}
                                    </span>

                                    <span className="mt-1 block text-[13px] font-semibold text-white/75">
                                        {empty
                                            ? t.comingSoon
                                            : t.photoCount.replace('{count}', entry.photos.length)}
                                    </span>
                                </span>

                                {!empty && (
                                    <span
                                        aria-hidden="true"
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-[18px] text-white backdrop-blur-sm transition-colors group-hover:bg-white/30"
                                    >
                                        →
                                    </span>
                                )}
                            </span>
                        </button>
                    )
                })}
            </div>

            {album && (
                <Album
                    album={album}
                    language={language}
                    onClose={() => setOpenAlbum(null)}
                />
            )}
        </Section>
    )
}

/*
 * Full-screen album: every photo of one category in a grid.
 * Clicking a photo opens it alone in the lightbox.
 */
function Album({ album, language, onClose }) {
    const t = translations[language].gallery
    const labels = translations[language].lightbox
    const [openIndex, setOpenIndex] = useState(null)
    const closeRef = useRef(null)

    const describe = (item) => [item.caption, item.event].filter(Boolean).join(' — ')

    const images = album.photos.map((item) => ({
        src: publicImageUrl(item.image_path),
        alt: describe(item) || album.name,
        caption: describe(item),
    }))

    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        closeRef.current?.focus()

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [])

    // Escape closes the album, but only when no single photo is open on top of it
    useEffect(() => {
        if (openIndex !== null) return

        const handleKey = (event) => {
            if (event.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [openIndex, onClose])

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="album-title"
            className="fixed inset-0 z-[90] overflow-y-auto bg-[#030712]/95 backdrop-blur-sm"
        >
            {/* HEADER */}

            <div className="sticky top-0 z-10 border-b border-white/10 bg-[#030712]/85 backdrop-blur-md">
                <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
                    <div className="min-w-0">
                        <h3 id="album-title" className="m-0 truncate text-[20px] font-extrabold text-white sm:text-[24px]">
                            <span aria-hidden="true" className="mr-2">{album.icon}</span>
                            {album.name}
                        </h3>

                        <p className="m-0 mt-0.5 text-[13px] text-slate-400">
                            {t.photoCount.replace('{count}', album.photos.length)}
                        </p>
                    </div>

                    <button
                        ref={closeRef}
                        type="button"
                        aria-label={t.back}
                        title={t.back}
                        onClick={onClose}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-none bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* PHOTOS — CSS columns keep each photo's own shape */}

            <ul className="mx-auto m-0 max-w-[1500px] list-none columns-2 gap-3 px-4 py-6 sm:columns-3 sm:gap-4 sm:px-8 lg:columns-4">
                {album.photos.map((item, index) => (
                    <li key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
                        <button
                            type="button"
                            aria-label={`${labels.open} ${index + 1}`}
                            onClick={() => setOpenIndex(index)}
                            className="group relative block w-full overflow-hidden rounded-xl border-none bg-white/5 p-0"
                        >
                            <img
                                src={publicImageUrl(item.thumb_path)}
                                alt={images[index].alt}
                                loading="lazy"
                                className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                            />

                            {describe(item) && (
                                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-3 pb-2.5 pt-8 text-left text-[13px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
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
        </div>,
        document.body,
    )
}

export default Gallery
