import SocialIcon from '../SocialIcon/SocialIcon.jsx'

function Hero({darkMode, language}) {
    const socialLinks = [
        {
            type: 'telegram',
            label: 'Telegram',
            href: 'https://t.me/bh_s_t',
        },
        {
            type: 'instagram',
            label: 'Instagram',
            href: 'https://www.instagram.com/bh_s_t',
        },
        {
            type: 'linkedin',
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/husanxon-bahodirxonov-16256b3a8',
        },
        {
            type: 'github',
            label: 'GitHub',
            href: 'https://github.com/Husanxon4407',
        },
        {
            type: 'email',
            label: 'Email',
            href: 'mailto:canikissyou4407@gmail.com',
        },
    ]
    return (
        <section
            id="home"
            className="relative min-h-[calc(100vh-60px)]"
        >
            <div
                className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-[1400px] items-center px-5 py-10 lg:px-8">

                <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">

                    {/* LEFT — INTRODUCTION */}

                    <div className="-translate-y-4">
                        <p
                            className={`mb-4 text-lg font-medium ${
                                darkMode
                                    ? 'text-cyan-300'
                                    : 'text-indigo-600'
                            }`}
                        >
                            — Hello, I'm
                        </p>

                        <h1
                            className={`text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[76px] ${
                                darkMode
                                    ? 'text-slate-100'
                                    : 'text-slate-900'
                            }`}
                        >
                            Husanxon
                            <br/>
                            <span
                                className={
                                    darkMode
                                        ? 'text-cyan-300'
                                        : 'text-indigo-600'
                                }
                            >
                                Bahodirkhonov
                            </span>
                        </h1>

                        <h2
                            className={`mt-4 text-xl font-bold sm:text-2xl ${
                                darkMode
                                    ? 'text-slate-100'
                                    : 'text-slate-800'
                            }`}
                        >
                            Business Information Systems Student
                        </h2>

                        <p
                            className={`mt-4 max-w-[600px] text-base leading-7 sm:text-lg ${
                                darkMode
                                    ? 'text-slate-400'
                                    : 'text-slate-600'
                            }`}
                        >
                            I build web projects, explore data, and contribute
                            to community initiatives. Currently studying at
                            WIUT and focused on Full Stack Development and
                            Data Science.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-600"
                            >
                                View Projects
                            </a>

                            <a
                                href="/Husanxon-CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`rounded-lg border px-6 py-3 font-semibold no-underline transition-all duration-300 hover:-translate-y-1 ${
                                    darkMode
                                        ? 'border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10'
                                        : 'border-indigo-500 text-indigo-600 hover:bg-indigo-500/5'
                                }`}
                            >
                                Download CV
                            </a>
                        </div>
                        <div className="mt-7 flex flex-wrap items-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.type}
                                    href={link.href}
                                    target={link.type === 'email' ? undefined : '_blank'}
                                    rel={
                                        link.type === 'email'
                                            ? undefined
                                            : 'noopener noreferrer'
                                    }
                                    aria-label={link.label}
                                    title={link.label}
                                    className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 ${
                                        darkMode
                                            ? 'bg-white/10 text-cyan-300 hover:bg-white/15'
                                            : 'bg-white/80 text-indigo-600 shadow-sm hover:bg-white'
                                    }`}
                                >
                                    <SocialIcon type={link.type}/>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — PORTRAIT */}

                    <div className="relative flex justify-center lg:justify-center">
                        <div className="relative h-[620px] w-[620px]">

                            {/* SHAPE 1 — LARGE BLUE BACKGROUND */}

                            <div
                                className={`absolute left-[135px] top-[35px] h-[440px] w-[365px] rotate-[7deg] rounded-[48%_52%_45%_55%/38%_42%_58%_62%] ${
                                    darkMode
                                        ? 'bg-cyan-500/80'
                                        : 'bg-blue-500/90'
                                }`}
                            />

                            {/* SHAPE 2 — RIGHT PURPLE/BLUE SHAPE */}

                            <div
                                className={`absolute right-[65px] top-[175px] h-[365px] w-[310px] rotate-[25deg] rounded-[55%_45%_48%_52%/45%_55%_45%_55%] ${
                                    darkMode
                                        ? 'bg-indigo-600/85'
                                        : 'bg-indigo-600/90'
                                }`}
                            />

                            {/* SHAPE 3 — LOWER LEFT PURPLE SHAPE */}

                            <div
                                className={`absolute bottom-[70px] left-[35px] h-[275px] w-[335px] rotate-[-18deg] rounded-[55%_45%_52%_48%/48%_52%_48%_52%] ${
                                    darkMode
                                        ? 'bg-indigo-500/80'
                                        : 'bg-violet-500/90'
                                }`}
                            />

                            {/* PORTRAIT CLIPPING AREA */}

                            <div className="absolute bottom-[70px] left-[105px] z-10 h-[500px] w-[450px] overflow-hidden rounded-[48%_52%_42%_58%/30%_38%_62%_70%]">

                                <img
                                    src={`${import.meta.env.BASE_URL}husanxon-cutout.png`}
                                    alt="Husanxon Bahodirkhonov"
                                    className="absolute left-1/2 top-[-10px] h-[700px] w-auto max-w-none -translate-x-1/2 object-contain"
                                />

                            </div>

                            {/* SAME PERSON — BIGGER GOALS */}

                            <div
                                className={`absolute right-[-5px] top-[105px] z-20 rotate-[-6deg] ${
                                    darkMode
                                        ? 'text-slate-200'
                                        : 'text-slate-800'
                                }`}
                            >

                                <p className="m-0 font-[cursive] text-xl leading-6 sm:text-2xl">
                                    Same person.
                                </p>

                                <p className="m-0 mt-1 font-[cursive] text-xl leading-6 sm:text-2xl">
                                    Bigger goals.
                                </p>

                                {/* CURVED CONNECTION */}

                                <svg
                                    className="absolute right-[5px] top-[65px] h-[100px] w-[125px]"
                                    viewBox="0 0 125 100"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M118 8 C108 38 88 55 58 65 C40 71 22 76 7 91"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />

                                    <circle
                                        cx="7"
                                        cy="91"
                                        r="5"
                                        className={
                                            darkMode
                                                ? 'fill-cyan-400'
                                                : 'fill-blue-500'
                                        }
                                    />
                                </svg>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero