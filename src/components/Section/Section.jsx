import { useInView } from '../../hooks/useInView.js'

/*
 * Shared frame for content sections: glass card + centered header.
 * Matches the look of the Education section.
 */
function Section({
    id,
    darkMode,
    label,
    titleFirst,
    titleHighlight,
    subtitle,
    children,
}) {
    const [ref, inView] = useInView({ threshold: 0.08 })

    return (
        <section
            id={id}
            className="relative w-full scroll-mt-[60px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 xl:px-12"
        >
            <div
                ref={ref}
                className={`
                    relative
                    mx-auto
                    w-full
                    max-w-[1500px]
                    2xl:max-w-[1760px]
                    overflow-hidden
                    rounded-[22px]
                    border
                    px-5
                    py-8
                    sm:px-8
                    sm:py-10
                    lg:px-10
                    lg:py-12
                    xl:px-14
                    xl:py-14
                    backdrop-blur-[4px]
                    transition-[opacity,translate]
                    duration-700
                    ease-out
                    ${
                    inView
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-6 opacity-0'
                }
                    ${
                    darkMode
                        ? 'border-cyan-400/20 bg-[#08131f]/65 shadow-[0_20px_70px_rgba(0,0,0,0.18)]'
                        : 'border-indigo-300/30 bg-white/65 shadow-[0_20px_70px_rgba(99,102,241,0.08)]'
                }
                `}
            >
                <div className="relative z-10 mx-auto mb-10 max-w-[900px] text-center sm:mb-12">

                    {/* LABEL */}

                    <div
                        className={`mb-3 flex items-center justify-center gap-3 text-[12px] font-bold tracking-[0.18em] sm:text-[13px] ${
                            darkMode
                                ? 'text-cyan-300'
                                : 'text-indigo-600'
                        }`}
                    >
                        <span className="h-px w-7 bg-current sm:w-9" />

                        <span>{label}</span>

                        <span className="h-px w-7 bg-current sm:w-9" />
                    </div>

                    {/* TITLE */}

                    <h2
                        className={`m-0 text-[30px] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-[38px] md:text-[42px] lg:text-[46px] ${
                            darkMode
                                ? 'text-slate-100'
                                : 'text-[#071126]'
                        }`}
                    >
                        <span>{titleFirst} </span>

                        <span
                            className={
                                darkMode
                                    ? 'text-cyan-300'
                                    : 'text-indigo-600'
                            }
                        >
                            {titleHighlight}
                        </span>
                    </h2>

                    {/* SUBTITLE */}

                    {subtitle && (
                        <p
                            className={`mx-auto mt-3 max-w-[760px] text-[13px] leading-6 sm:text-[15px] ${
                                darkMode
                                    ? 'text-slate-400'
                                    : 'text-slate-600'
                            }`}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {children}
            </div>
        </section>
    )
}

/*
 * Inner card used inside sections.
 */
export function Card({ darkMode, className = '', children }) {
    return (
        <div
            className={`rounded-2xl border p-5 sm:p-6 ${
                darkMode
                    ? 'border-white/10 bg-white/[0.04]'
                    : 'border-indigo-600/10 bg-white/75 shadow-sm'
            } ${className}`}
        >
            {children}
        </div>
    )
}

/*
 * Small rounded tag, e.g. a skill or tech stack item.
 */
export function Chip({ darkMode, children }) {
    return (
        <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-[13px] font-semibold ${
                darkMode
                    ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200'
                    : 'border-indigo-500/15 bg-indigo-500/[0.07] text-indigo-700'
            }`}
        >
            {children}
        </span>
    )
}

export default Section
