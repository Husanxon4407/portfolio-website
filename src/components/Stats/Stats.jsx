import { useEffect, useState } from 'react'
import { translations } from '../../data/translations.js'
import { stats } from '../../data/profile.js'
import { useInView } from '../../hooks/useInView.js'

const DURATION = 1400

const prefersReducedMotion = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

function Stats({ darkMode, language }) {
    const t = translations[language].stats
    const [ref, inView] = useInView({ threshold: 0.3 })

    return (
        <section
            aria-label="Key achievements"
            className="relative w-full px-4 pt-4 pb-6 sm:px-6 lg:px-8 xl:px-12"
        >
            <ul
                ref={ref}
                className="mx-auto m-0 grid w-full max-w-[1500px] list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 2xl:max-w-[1760px]"
            >
                {stats.map((stat, index) => (
                    <li
                        key={stat.id}
                        className={`rounded-2xl border px-4 py-5 text-center backdrop-blur-[4px] sm:py-6 ${
                            index === stats.length - 1
                                ? 'col-span-2 sm:col-span-1'
                                : ''
                        } ${
                            darkMode
                                ? 'border-cyan-400/20 bg-[#08131f]/65'
                                : 'border-indigo-300/30 bg-white/65 shadow-[0_10px_40px_rgba(99,102,241,0.06)]'
                        }`}
                    >
                        <div
                            // Browser auto-translate replaces text nodes and freezes the counter
                            translate="no"
                            className={`text-[32px] font-extrabold leading-none tracking-[-0.03em] sm:text-[38px] ${
                                darkMode
                                    ? 'text-cyan-300'
                                    : 'text-indigo-600'
                            }`}
                        >
                            <CountUp stat={stat} start={inView} />
                        </div>

                        <div
                            className={`mt-2 text-[13px] font-medium leading-5 sm:text-[14px] ${
                                darkMode
                                    ? 'text-slate-400'
                                    : 'text-slate-600'
                            }`}
                        >
                            {t[stat.id]}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

function CountUp({ stat, start }) {
    const { value, prefix = '', suffix = '', decimals = 0 } = stat
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!start || prefersReducedMotion()) return

        let frame
        const startedAt = performance.now()

        const tick = (now) => {
            const elapsed = Math.min((now - startedAt) / DURATION, 1)
            setProgress(elapsed)
            if (elapsed < 1) frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(frame)
    }, [start])

    // Ease-out cubic so the numbers slow down near the end
    const eased = start && prefersReducedMotion() ? 1 : 1 - (1 - progress) ** 3
    const current = (value * eased).toFixed(decimals)

    return (
        <>
            <span aria-hidden="true">
                {prefix}{current}{suffix}
            </span>
            <span className="sr-only">
                {prefix}{value.toFixed(decimals)}{suffix}
            </span>
        </>
    )
}

export default Stats
