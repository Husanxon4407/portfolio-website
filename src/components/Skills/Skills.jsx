import { translations } from '../../data/translations.js'
import { skillGroups, spokenLanguages } from '../../data/profile.js'
import Section, { Card, Chip } from '../Section/Section.jsx'

const MAX_SCORE = 6

function Skills({ darkMode, language }) {
    const t = translations[language].skills

    return (
        <Section
            id="skills"
            darkMode={darkMode}
            label={t.label}
            titleFirst={t.titleFirst}
            titleHighlight={t.titleHighlight}
            subtitle={t.subtitle}
        >
            {/* TECHNICAL SKILLS */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {skillGroups.map((group, index) => (
                    <Card
                        key={group.id}
                        darkMode={darkMode}
                        // Odd count: let the last card fill the row on 2-column layouts
                        className={index === skillGroups.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}
                    >
                        <h3
                            className={`m-0 mb-4 flex items-center gap-2 text-[15px] font-extrabold ${
                                darkMode
                                    ? 'text-slate-100'
                                    : 'text-[#172554]'
                            }`}
                        >
                            {t.groups[group.id]}

                            {group.learning && (
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                                        darkMode
                                            ? 'bg-violet-400/15 text-violet-300'
                                            : 'bg-violet-500/10 text-violet-600'
                                    }`}
                                >
                                    {t.learning}
                                </span>
                            )}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {group.items.map((item) => (
                                <Chip key={item} darkMode={darkMode}>
                                    {item}
                                </Chip>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>

            {/* SPOKEN LANGUAGES */}

            <Card darkMode={darkMode} className="mt-5 lg:mt-6">
                <h3
                    className={`m-0 mb-5 text-[15px] font-extrabold ${
                        darkMode
                            ? 'text-slate-100'
                            : 'text-[#172554]'
                    }`}
                >
                    {t.languagesTitle}
                </h3>

                <ul className="m-0 grid list-none gap-x-10 gap-y-4 p-0 md:grid-cols-2 xl:grid-cols-3">
                    {spokenLanguages.map((item) => {
                        const levelLabel = item.level === 'native' ? t.native : item.level

                        return (
                            <li key={item.id}>
                                <div className="mb-2 flex items-baseline justify-between gap-3">
                                    <span
                                        className={`text-[15px] font-semibold ${
                                            darkMode
                                                ? 'text-slate-200'
                                                : 'text-slate-700'
                                        }`}
                                    >
                                        {t.languages[item.id]}
                                    </span>

                                    <span
                                        className={`text-[13px] font-bold ${
                                            darkMode
                                                ? 'text-cyan-300'
                                                : 'text-indigo-600'
                                        }`}
                                    >
                                        {levelLabel}
                                    </span>
                                </div>

                                <div
                                    role="meter"
                                    aria-label={`${t.languages[item.id]}: ${levelLabel}`}
                                    aria-valuemin={0}
                                    aria-valuemax={MAX_SCORE}
                                    aria-valuenow={item.score}
                                    className="flex gap-1"
                                >
                                    {Array.from({ length: MAX_SCORE }, (_, index) => (
                                        <span
                                            key={index}
                                            className={`h-2 flex-1 rounded-full ${
                                                index < item.score
                                                    ? darkMode
                                                        ? 'bg-cyan-400'
                                                        : 'bg-indigo-500'
                                                    : darkMode
                                                        ? 'bg-white/10'
                                                        : 'bg-indigo-500/10'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </Card>
        </Section>
    )
}

export default Skills
