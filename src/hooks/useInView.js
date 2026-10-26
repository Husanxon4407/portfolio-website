import { useEffect, useRef, useState } from 'react'

/*
 * Reports whether the element has scrolled into view.
 * With `once`, it stays true after the first time it appears.
 */
export function useInView({ threshold = 0.15, once = true } = {}) {
    const ref = useRef(null)
    const [inView, setInView] = useState(
        () => typeof IntersectionObserver === 'undefined',
    )

    useEffect(() => {
        const element = ref.current
        if (!element || typeof IntersectionObserver === 'undefined') return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    if (once) observer.disconnect()
                } else if (!once) {
                    setInView(false)
                }
            },
            { threshold },
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [threshold, once])

    return [ref, inView]
}
