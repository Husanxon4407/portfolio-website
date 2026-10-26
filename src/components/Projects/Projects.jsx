import { translations } from '../../data/translations.js'
import { projects, githubProfile } from '../../data/profile.js'
import Section, { Chip } from '../Section/Section.jsx'
import SocialIcon from '../SocialIcon/SocialIcon.jsx'
import { publicImageUrl } from '../../lib/supabaseConfig.js'

const ICONS = ['</>', '{ }', '⚡', '◆']

// Projects added in the admin panel replace the built-in ones from profile.js
const toProjectList = (items, language, t) => {
    if (items.length > 0) {
        return items.map((item, index) => ({
            id: item.id,
            title: item.title,
            description: item[`description_${language.toLowerCase()}`] || item.description_en,
            stack: item.stack ?? [],
            codeUrl: item.code_url,
            liveUrl: item.live_url,
            image: publicImageUrl(item.thumb_path),
            icon: ICONS[index % ICONS.length],
        }))
    }

    return projects.map((project) => ({
        ...project,
        description: t.items[project.id],
    }))
}

function Projects({ darkMode, language, items = [] }) {
    const t = translations[language].projects
    const list = toProjectList(items, language, t)

    return (
        <Section
            id="projects"
            darkMode={darkMode}
            label={t.label}
            titleFirst={t.titleFirst}
            titleHighlight={t.titleHighlight}
            subtitle={t.subtitle}
        >
            <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
                {list.map((project, index) => (
                    <article
                        key={project.id}
                        className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                            darkMode
                                ? 'border-white/10 bg-white/[0.04] hover:border-cyan-400/30'
                                : 'border-indigo-600/10 bg-white/75 shadow-sm hover:shadow-[0_18px_50px_rgba(99,102,241,0.14)]'
                        }`}
                    >
                        {/* COVER */}

                        <div
                            aria-hidden="true"
                            className={`relative flex h-[150px] items-center justify-center overflow-hidden sm:h-[180px] ${
                                index % 2 === 0
                                    ? darkMode
                                        ? 'bg-linear-to-br from-cyan-500/25 via-sky-700/20 to-indigo-900/30'
                                        : 'bg-linear-to-br from-indigo-500 via-sky-500 to-cyan-400'
                                    : darkMode
                                        ? 'bg-linear-to-br from-violet-500/25 via-indigo-700/20 to-slate-900/30'
                                        : 'bg-linear-to-br from-violet-600 via-indigo-500 to-sky-400'
                            }`}
                        >
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt=""
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <span className="text-[64px] font-black leading-none text-white/90 transition-transform duration-500 group-hover:scale-110 sm:text-[76px]">
                                    {project.icon}
                                </span>
                            )}
                        </div>

                        {/* BODY */}

                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                            <h3
                                className={`m-0 text-[20px] font-extrabold ${
                                    darkMode
                                        ? 'text-slate-100'
                                        : 'text-[#172554]'
                                }`}
                            >
                                {project.title}
                            </h3>

                            <p
                                className={`m-0 mt-2 flex-1 text-[14px] leading-6 sm:text-[15px] ${
                                    darkMode
                                        ? 'text-slate-400'
                                        : 'text-slate-600'
                                }`}
                            >
                                {project.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <Chip key={tech} darkMode={darkMode}>
                                        {tech}
                                    </Chip>
                                ))}
                            </div>

                            {(project.codeUrl || project.liveUrl) && (
                                <div className="mt-5 flex flex-wrap gap-3">
                                    {project.codeUrl && (
                                        <ProjectLink href={project.codeUrl} darkMode={darkMode}>
                                            <SocialIcon type="github" />
                                            {t.code}
                                        </ProjectLink>
                                    )}

                                    {project.liveUrl && (
                                        <ProjectLink href={project.liveUrl} darkMode={darkMode} primary>
                                            {t.live}
                                            <span aria-hidden="true">↗</span>
                                        </ProjectLink>
                                    )}
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <ProjectLink href={githubProfile} darkMode={darkMode}>
                    <SocialIcon type="github" />
                    {t.moreOnGitHub}
                </ProjectLink>
            </div>
        </Section>
    )
}

function ProjectLink({ href, darkMode, primary = false, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-[14px] font-bold no-underline transition-all duration-300 [&_svg]:h-5 [&_svg]:w-5 ${
                primary
                    ? darkMode
                        ? 'bg-cyan-400 text-[#07131f] hover:bg-cyan-300'
                        : 'bg-indigo-500 text-white hover:bg-indigo-600'
                    : darkMode
                        ? 'border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/30 hover:text-cyan-300'
                        : 'border border-indigo-600/15 bg-white text-slate-700 hover:border-indigo-500/30 hover:text-indigo-600'
            }`}
        >
            {children}
        </a>
    )
}

export default Projects
