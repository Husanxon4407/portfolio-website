import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/*
 * Full-screen image viewer.
 * images: [{ src, alt, caption }]; index: open image or null when closed.
 */
function Lightbox({ images, index, onChange, onClose, labels }) {
    const closeRef = useRef(null)
    const open = index !== null && images[index]

    useEffect(() => {
        if (!open) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        closeRef.current?.focus()

        const handleKey = (event) => {
            if (event.key === 'Escape') onClose()
            if (event.key === 'ArrowRight') onChange((index + 1) % images.length)
            if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
        }

        document.addEventListener('keydown', handleKey)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKey)
        }
    }, [open, index, images.length, onChange, onClose])

    if (!open) return null

    const image = images[index]
    const many = images.length > 1

    const buttonClass =
        'flex h-12 w-12 items-center justify-center rounded-full border-none bg-white/10 text-2xl text-white transition-colors hover:bg-white/20'

    // Portal to <body>: sections use transforms/backdrop-filter, which would trap position: fixed
    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={image.alt}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712]/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={onClose}
        >
            <button
                ref={closeRef}
                type="button"
                aria-label={labels.close}
                onClick={onClose}
                className={`absolute right-4 top-4 ${buttonClass}`}
            >
                ✕
            </button>

            {many && (
                <button
                    type="button"
                    aria-label={labels.previous}
                    onClick={(event) => {
                        event.stopPropagation()
                        onChange((index - 1 + images.length) % images.length)
                    }}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 sm:left-6 ${buttonClass}`}
                >
                    ‹
                </button>
            )}

            <figure
                className="m-0 flex max-h-full max-w-[1200px] flex-col items-center"
                onClick={(event) => event.stopPropagation()}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl"
                />

                {image.caption && (
                    <figcaption className="mt-4 max-w-[760px] text-center text-[15px] leading-6 text-slate-200">
                        {image.caption}
                    </figcaption>
                )}

                {many && (
                    <div className="mt-2 text-[13px] text-slate-400">
                        {index + 1} / {images.length}
                    </div>
                )}
            </figure>

            {many && (
                <button
                    type="button"
                    aria-label={labels.next}
                    onClick={(event) => {
                        event.stopPropagation()
                        onChange((index + 1) % images.length)
                    }}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 sm:right-6 ${buttonClass}`}
                >
                    ›
                </button>
            )}
        </div>,
        document.body,
    )
}

export default Lightbox
