import { translations } from '../../data/translations.js'
import Section, { Card, Chip } from '../Section/Section.jsx'

function About({ darkMode, language }) {
    const t = translations[language].about

    return (
        <Section
            id="about"
            darkMode={darkMode}
            label={t.label}
            titleFirst={t.titleFirst}
            titleHighlight={t.titleHighlight}
        >
            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6">

                {/* STORY */}

                <Card darkMode={darkMode} className="flex flex-col gap-4">
                    {t.paragraphs.map((paragraph) => (
                        <p
                            key={paragraph}
                            className={`m-0 text-[15px] leading-7 sm:text-[16px] ${
                                darkMode
                                    ? 'text-slate-300'
                                    : 'text-slate-700'
                            }`}
                        >
                            {paragraph}
                        </p>
                    ))}
                </Card>

                <div className="flex flex-col gap-5">

                    {/* COMPETENCIES */}

                    <Card darkMode={darkMode}>
                        <h3
                            className={`m-0 mb-4 text-[15px] font-extrabold ${
                                darkMode
                                    ? 'text-slate-100'
                                    : 'text-[#172554]'
                            }`}
                        >
                            {t.competenciesTitle}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {t.competencies.map((item) => (
                                <Chip key={item} darkMode={darkMode}>
                                    {item}
                                </Chip>
                            ))}
                        </div>
                    </Card>

                    {/* CURRENTLY */}

                    <Card darkMode={darkMode}>
                        <h3
                            className={`m-0 mb-3 flex items-center gap-2 text-[15px] font-extrabold ${
                                darkMode
                                    ? 'text-slate-100'
                                    : 'text-[#172554]'
                            }`}
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>

                            {t.nowTitle}
                        </h3>

                        <ul className="m-0 flex list-none flex-col gap-2 p-0">
                            {t.now.map((item) => (
                                <li
                                    key={item}
                                    className={`flex gap-2 text-[14px] leading-6 ${
                                        darkMode
                                            ? 'text-slate-300'
                                            : 'text-slate-700'
                                    }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={
                                            darkMode
                                                ? 'text-cyan-300'
                                                : 'text-indigo-600'
                                        }
                                    >
                                        →
                                    </span>

                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </Section>
    )
}

export default About
