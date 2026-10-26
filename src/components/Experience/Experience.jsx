import { translations } from '../../data/translations.js'
import { experience } from '../../data/profile.js'
import Section, { Card } from '../Section/Section.jsx'

function Experience({ darkMode, language }) {
    const t = translations[language].experience

    const items = experience.map((entry) => ({
        ...entry,
        ...t.items[entry.id],
    }))

    const work = items.filter((item) => item.type === 'work')
    const volunteer = items.filter((item) => item.type === 'volunteer')

    return (
        <Section
            id="experience"
            darkMode={darkMode}
            label={t.label}
            titleFirst={t.titleFirst}
            titleHighlight={t.titleHighlight}
            subtitle={t.subtitle}
        >
            <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-10">

                {/* WORK */}

                <div>
                    <GroupTitle darkMode={darkMode}>{t.workTitle}</GroupTitle>

                    <div className="flex flex-col gap-4">
                        {work.map((item) => (
                            <Card key={item.id} darkMode={darkMode}>
                                <ExperienceHeader item={item} darkMode={darkMode} large />
                                <Points points={item.points} darkMode={darkMode} />
                            </Card>
                        ))}
                    </div>
                </div>

                {/* VOLUNTEERING — vertical timeline */}

                <div>
                    <GroupTitle darkMode={darkMode}>{t.volunteerTitle}</GroupTitle>

                    <ol className="relative m-0 list-none p-0">
                        <span
                            aria-hidden="true"
                            className={`absolute bottom-3 left-[7px] top-3 w-px ${
                                darkMode
                                    ? 'bg-cyan-400/40'
                                    : 'bg-indigo-400/45'
                            }`}
                        />

                        {volunteer.map((item, index) => (
                            <li key={item.id} className="relative pb-6 pl-8 last:pb-0">
                                <span
                                    aria-hidden="true"
                                    className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full ${
                                        index % 2 === 0
                                            ? darkMode
                                                ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.55)]'
                                                : 'bg-indigo-500 shadow-[0_0_12px_rgba(79,70,229,0.35)]'
                                            : darkMode
                                                ? 'bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.5)]'
                                                : 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.35)]'
                                    }`}
                                >
                                    <span className="h-[5px] w-[5px] rounded-full bg-white" />
                                </span>

                                <ExperienceHeader item={item} darkMode={darkMode} />
                                <Points points={item.points} darkMode={darkMode} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Section>
    )
}

function GroupTitle({ darkMode, children }) {
    return (
        <h3
            className={`m-0 mb-5 text-[13px] font-bold uppercase tracking-[0.14em] ${
                darkMode
                    ? 'text-violet-300'
                    : 'text-violet-600'
            }`}
        >
            {children}
        </h3>
    )
}

function ExperienceHeader({ item, darkMode, large = false }) {
    return (
        <div>
            <div className="flex flex-wrap items-center gap-2">
                <span
                    className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${
                        darkMode
                            ? 'bg-cyan-400/10 text-cyan-300'
                            : 'bg-indigo-500/10 text-indigo-600'
                    }`}
                >
                    {item.date}
                </span>

                {item.current && (
                    <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                )}
            </div>

            <h4
                className={`m-0 mt-2 font-extrabold leading-snug ${
                    large
                        ? 'text-[19px] sm:text-[21px]'
                        : 'text-[16px] sm:text-[17px]'
                } ${
                    darkMode
                        ? 'text-slate-100'
                        : 'text-[#172554]'
                }`}
            >
                {item.role}
                <span
                    className={`font-semibold ${
                        darkMode
                            ? 'text-slate-400'
                            : 'text-slate-500'
                    }`}
                >
                    {' — '}
                    {item.org}
                    {item.place && `, ${item.place}`}
                </span>
            </h4>
        </div>
    )
}

function Points({ points, darkMode }) {
    return (
        <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
            {points.map((point) => (
                <li
                    key={point}
                    className={`flex gap-2 text-[14px] leading-6 sm:text-[15px] ${
                        darkMode
                            ? 'text-slate-300'
                            : 'text-slate-600'
                    }`}
                >
                    <span
                        aria-hidden="true"
                        className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${
                            darkMode
                                ? 'bg-cyan-300'
                                : 'bg-indigo-500'
                        }`}
                    />
                    {point}
                </li>
            ))}
        </ul>
    )
}

export default Experience
