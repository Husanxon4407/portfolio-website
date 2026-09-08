import { useEffect, useState } from 'react'
import { translations } from '../../data/translations.js'
import SocialIcon from '../SocialIcon/SocialIcon.jsx'

function Hero({ darkMode, language }) {
    const t = translations[language].hero

    const [animationKey, setAnimationKey] = useState(0)

    /*
     * Restart the name animation whenever the language changes.
     * This is useful because the Russian version uses a different name.
     */
    useEffect(() => {
        setAnimationKey((previous) => previous + 1)
    }, [language])

    /*
     * Creates individual letters so the name appears
     * exactly like someone is typing it.
     */
    const renderLetters = (text, startDelay = 0) => {
        return [...text].map((letter, index) => (
            <span
                key={`${animationKey}-${index}`}
                className="inline-block opacity-0"
                style={{
                    animation: 'heroLetter 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                    animationDelay: `${startDelay + index * 0.055}s`,
                }}
            >
                {letter === ' ' ? '\u00A0' : letter}
            </span>
        ))
    }

    /*
     * Social/contact links.
     */
    const socialLinks = [
        {
            type: 'telegram',
            href: 'https://t.me/bh_s_t',
            label: 'Telegram',
        },
        {
            type: 'instagram',
            href: 'https://www.instagram.com/bh_s_t',
            label: 'Instagram',
        },
        {
            type: 'linkedin',
            href: 'https://www.linkedin.com/in/husanxon-bahodirxonov-16256b3a8',
            label: 'LinkedIn',
        },
        {
            type: 'github',
            href: 'https://github.com/Husanxon4407',
            label: 'GitHub',
        },
        {
            type: 'email',
            href: 'mailto:canikissyou4407@gmail.com',
            label: 'Email',
        },
    ]

    return (
        <>
            {/* =========================================================
                HERO ANIMATION STYLES

                Kept inside Hero.jsx so you do NOT need to add
                anything to index.css.
            ========================================================== */}
            <style>
                {`
                    @keyframes heroLetter {
                        0% {
                            opacity: 0;
                            transform: translateY(18px);
                        }

                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes heroReveal {
                        0% {
                            opacity: 0;
                            transform: translateY(14px);
                        }

                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes heroFloat {
                        0%,
                        100% {
                            transform: translateY(0);
                        }

                        50% {
                            transform: translateY(7px);
                        }
                    }

                    @keyframes heroOrbitFloat {
                        0%,
                        100% {
                            transform: translate(-50%, -50%);
                        }

                        50% {
                            transform: translate(-50%, calc(-50% + 5px));
                        }
                    }
                `}
            </style>

            <section
                id="home"
                className={`
                    relative
                    min-h-[calc(100vh-60px)]
                    overflow-hidden
                    px-6
                    sm:px-8
                    lg:px-10
                    xl:px-14
                    2xl:px-20
                `}
            >
                {/* =====================================================
                    MAIN HERO CONTAINER
                ====================================================== */}
                <div
                    className="
                        relative
                        mx-auto
                        flex
                        min-h-[calc(100vh-60px)]
                        w-full
                        max-w-[1500px]
                        items-center
                    "
                >
                    {/* =================================================
                        LEFT SIDE
                    ================================================== */}
                    <div
                        className="
                            relative
                            z-30
                            flex
                            w-full
                            flex-col
                            justify-center
                            pt-8
                            pb-24
                            lg:w-[52%]
                            lg:-translate-x-1

                            lg:pt-0
                            lg:pb-10
                        "
                    >
                        {/* GREETING */}
                        <div
                            className={`
                                mb-7
                                flex
                                items-center
                                gap-2
                                text-[20px]
                                font-medium
                                sm:text-[21px]
                                lg:text-[22px]
                                ${
                                darkMode
                                    ? 'text-cyan-300'
                                    : 'text-indigo-600'
                            }
                            `}
                            style={{
                                opacity: 0,
                                animation:
                                    'heroReveal 0.6s ease-out 0.15s forwards',
                            }}
                        >
                            <span className="text-[24px] leading-none">
                                —
                            </span>

                            <span>{t.greeting}</span>
                        </div>

                        {/* =================================================
                            NAME
                        ================================================== */}
                        <div
                            key={animationKey}
                            className="
                                mb-7
                                leading-[0.9]
                                tracking-[-0.055em]
                            "
                        >
                            {/* FIRST NAME */}
                            <div
                                className={`
                                    text-[58px]
                                    font-extrabold
                                    sm:text-[72px]
                                    lg:text-[76px]
                                    xl:text-[82px]
                                    ${
                                    darkMode
                                        ? 'text-slate-100'
                                        : 'text-[#071126]'
                                }
                                `}
                            >
                                {renderLetters(t.titleFirst, 0.35)}
                            </div>

                            {/* LAST NAME */}
                            <div
                                className={`
                                    mt-2
                                    text-[54px]
                                    font-extrabold
                                    sm:text-[68px]
                                    lg:text-[72px]
                                    xl:text-[78px]
                                    ${
                                    darkMode
                                        ? 'text-cyan-300'
                                        : 'text-indigo-600'
                                }
                                `}
                            >
                                {renderLetters(
                                    t.titleLast,
                                    0.35 + [...t.titleFirst].length * 0.055 + 0.08,
                                )}
                            </div>
                        </div>

                        {/* =================================================
                            ROLE
                        ================================================== */}
                        <div
                            className={`
                                mb-4
                                text-[21px]
                                font-bold
                                sm:text-[23px]
                                lg:text-[24px]
                                ${
                                darkMode
                                    ? 'text-slate-100'
                                    : 'text-[#17233b]'
                            }
                            `}
                            style={{
                                opacity: 0,
                                animation:
                                    'heroReveal 0.65s ease-out 2.0s forwards',
                            }}
                        >
                            {t.role}
                        </div>

                        {/* =================================================
                            DESCRIPTION
                        ================================================== */}
                        <p
                            className={`
                                mb-8
                                max-w-[680px]
                                text-[17px]
                                leading-[1.7]
                                sm:text-[18px]
                                lg:text-[18px]
                                ${
                                darkMode
                                    ? 'text-slate-400'
                                    : 'text-slate-600'
                            }
                            `}
                            style={{
                                opacity: 0,
                                animation:
                                    'heroReveal 0.65s ease-out 2.15s forwards',
                            }}
                        >
                            {t.description}
                        </p>

                        {/* =================================================
                            BUTTONS
                        ================================================== */}
                        <div
                            className="
                                mb-8
                                flex
                                flex-wrap
                                gap-4
                            "
                            style={{
                                opacity: 0,
                                animation:
                                    'heroReveal 0.65s ease-out 2.3s forwards',
                            }}
                        >
                            {/* VIEW PROJECTS */}
                            <a
                                href="#projects"
                                className={`
                                    inline-flex
                                    h-[60px]
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-xl
                                    px-7
                                    text-[17px]
                                    font-semibold
                                    no-underline
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                    ${
                                    darkMode
                                        ? 'bg-indigo-500 text-white hover:bg-indigo-400'
                                        : 'bg-indigo-500 text-white hover:bg-indigo-600'
                                }
                                `}
                            >
                                <span>{t.viewProjects}</span>

                                <span className="text-[20px]">
                                    →
                                </span>
                            </a>

                            {/* DOWNLOAD CV */}
                            <a
                                href={`${import.meta.env.BASE_URL}Husanxon-Bahodirkhonov-CV.pdf`}
                                download
                                className={`
                                    inline-flex
                                    h-[60px]
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    px-7
                                    text-[17px]
                                    font-semibold
                                    no-underline
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    ${
                                    darkMode
                                        ? 'border-cyan-500/70 text-cyan-300 hover:bg-cyan-400/10'
                                        : 'border-indigo-500 text-indigo-600 hover:bg-indigo-500/10'
                                }
                                `}
                            >
                                {t.downloadCV}
                            </a>
                        </div>

                        {/* =================================================
                            SOCIAL ICONS
                        ================================================== */}
                        <div
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-4
                            "
                            style={{
                                opacity: 0,
                                animation:
                                    'heroReveal 0.65s ease-out 2.45s forwards',
                            }}
                        >
                            {socialLinks.map((social) => (
                                <a
                                    key={social.type}
                                    href={social.href}
                                    target={
                                        social.type === 'email'
                                            ? undefined
                                            : '_blank'
                                    }
                                    rel={
                                        social.type === 'email'
                                            ? undefined
                                            : 'noopener noreferrer'
                                    }
                                    aria-label={social.label}
                                    title={social.label}
                                    className={`
                                        flex
                                        h-[60px]
                                        w-[60px]
                                        items-center
                                        justify-center
                                        rounded-full
                                        shadow-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:scale-105
                                        ${
                                        darkMode
                                            ? 'bg-slate-800/90 text-cyan-300 shadow-black/20 hover:bg-slate-700'
                                            : 'bg-white/90 text-indigo-600 shadow-slate-300/60 hover:bg-white'
                                    }
                                    `}
                                >
                                    <SocialIcon type={social.type} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* =====================================================
                        RIGHT SIDE — CIRCULAR AVATAR
                    ====================================================== */}
                    <div
                        className="
                            relative
                            hidden
                            w-[48%]
                            items-center
                            justify-center
                            lg:flex
                            lg:translate-x-3
                            xl:translate-x-5
                        "
                    >
                        <div
                            className="
                                relative
                                h-[590px]
                                w-[590px]
                                xl:h-[620px]
                                xl:w-[620px]
                            "
                        >
                            {/* =============================================
                                MAIN CIRCLE
                            ============================================== */}
                            <div
                                className={`
                                    absolute
                                    left-1/2
                                    top-1/2
                                    h-[455px]
                                    w-[455px]
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    bg-gradient-to-br
                                    shadow-[0_25px_70px_rgba(79,70,229,0.16)]
                                    xl:h-[475px]
                                    xl:w-[475px]
                                    ${
                                    darkMode
                                        ? 'from-cyan-500 via-blue-600 to-indigo-700'
                                        : 'from-violet-400 via-indigo-500 to-purple-600'
                                }
                                `}
                            />

                            {/* =============================================
                                SUBTLE INNER GLOW
                            ============================================== */}
                            <div
                                className={`
                                    absolute
                                    left-1/2
                                    top-1/2
                                    h-[440px]
                                    w-[440px]
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    ${
                                    darkMode
                                        ? 'bg-cyan-300/10'
                                        : 'bg-white/10'
                                }
                                `}
                            />

                            {/* =============================================
                                OUTER ORBIT RING
                            ============================================== */}
                            <div
                                className={`
                                    absolute
                                    left-1/2
                                    top-1/2
                                    h-[505px]
                                    w-[505px]
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    border-[1.5px]
                                    ${
                                    darkMode
                                        ? 'border-cyan-400/30'
                                        : 'border-indigo-400/30'
                                }
                                `}
                            />

                            {/* =============================================
                                SECOND ORBIT RING
                            ============================================== */}
                            <div
                                className={`
                                    absolute
                                    left-1/2
                                    top-1/2
                                    h-[530px]
                                    w-[530px]
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    border
                                    ${
                                    darkMode
                                        ? 'border-cyan-300/10'
                                        : 'border-indigo-300/20'
                                }
                                `}
                            />

                            {/* =============================================
                                TOP-RIGHT ORBIT CIRCLE
                            ============================================== */}
                            <div
                                className={`
                                    absolute
                                    left-[calc(50%+180px)]
                                    top-[calc(50%-265px)]
                                    z-40
                                    h-[56px]
                                    w-[56px]
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    border-2
                                    shadow-lg
                                    ${
                                    darkMode
                                        ? 'border-cyan-300/30 bg-cyan-400/80 shadow-cyan-500/10'
                                        : 'border-white/70 bg-indigo-300/90 shadow-indigo-500/10'
                                }
                                `}
                            />

                            {/* =============================================
                                BOTTOM-LEFT ORBIT CIRCLE
                            ============================================== */}
                            <div
                                className={`
                                    absolute
                                    left-[calc(50%-205px)]
                                    top-[calc(50%+220px)]
                                    z-40
                                    h-[58px]
                                    w-[58px]
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    border-2
                                    shadow-lg
                                    ${
                                    darkMode
                                        ? 'border-cyan-300/30 bg-indigo-500/90 shadow-indigo-500/10'
                                        : 'border-white/70 bg-violet-400/90 shadow-violet-500/10'
                                }
                                `}
                            />

                            {/* =============================================
                                CIRCULAR PHOTO CONTAINER

                                IMPORTANT:
                                overflow-hidden + rounded-full means
                                the body can NEVER escape the circle.
                            ============================================== */}
                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    z-20
                                    h-[440px]
                                    w-[440px]
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    overflow-hidden
                                    rounded-full
                                    xl:h-[460px]
                                    xl:w-[460px]
                                "
                            >
                                {/* PHOTO */}
                                <img
                                    src={`${import.meta.env.BASE_URL}husanxon-cutout.png`}
                                    alt="Husanxon Bahodirkhonov"
                                    className="
                                        absolute
                                        bottom-[-30px]                                        left-1/2
                                        left-1/2
                                        h-[500px]
                                        w-auto
                                        max-w-none
                                        -translate-x-1/2
                                        object-contain
                                        object-bottom
                                        xl:bottom-[-30px]
                                        xl:h-[525px]
                                    "
                                />

                                {/* =========================================
                                    NATURAL COLOR FADE

                                    NO WHITE.
                                    The fade uses the same blue/purple
                                    environment as the main circle.
                                ========================================== */}
                                <div
                                    className={`
                                        pointer-events-none
                                        absolute
                                        inset-x-0
                                        bottom-0
                                        z-30
                                        h-[150px]
                                        ${
                                        darkMode
                                            ? 'bg-gradient-to-t from-[#172554] via-[#1e40af]/70 to-transparent'
                                            : 'bg-gradient-to-t from-[#4338ca] via-[#6366f1]/55 to-transparent'
                                    }
                                    `}
                                />

                                {/* Extra soft color transition */}
                                <div
                                    className={`
                                        pointer-events-none
                                        absolute
                                        -bottom-[25px]
                                        left-1/2
                                        z-30
                                        h-[100px]
                                        w-[85%]
                                        -translate-x-1/2
                                        rounded-full
                                        blur-[24px]
                                        ${
                                        darkMode
                                            ? 'bg-indigo-700/65'
                                            : 'bg-indigo-500/50'
                                    }
                                    `}
                                />
                            </div>

                            {/* =============================================
                                QUOTE
                            ============================================== */}
                            <div
                                className="
                                    absolute
                                    right-[-2px]
                                    top-[145px]
                                    z-50
                                    w-[180px]
                                "
                            >
                                <p
                                    className={`
                                        m-0
                                        font-[cursive]
                                        text-[19px]
                                        font-semibold
                                        leading-[1.12]
                                        tracking-[-0.02em]
                                        xl:text-[20px]
                                        ${
                                        darkMode
                                            ? 'text-slate-100'
                                            : 'text-[#172554]'
                                    }
                                    `}
                                >
                                    {t.tagline}
                                </p>
                            </div>

                            {/* =============================================
                                QUOTE CURVED CONNECTOR
                            ============================================== */}
                            <svg
                                className="
                                    pointer-events-none
                                    absolute
                                    right-[25px]
                                    top-[180px]
                                    z-40
                                    h-[170px]
                                    w-[190px]
                                    overflow-visible
                                "
                                viewBox="0 0 190 170"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="
                                        M 174 4
                                        C 170 42,
                                          157 70,
                                          130 94
                                        C 104 117,
                                          72 130,
                                          28 145
                                    "
                                    stroke={
                                        darkMode
                                            ? '#22D3EE'
                                            : '#172554'
                                    }
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />

                                <circle
                                    cx="28"
                                    cy="145"
                                    r="5.5"
                                    fill={
                                        darkMode
                                            ? '#22D3EE'
                                            : '#4F46E5'
                                    }
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* =========================================================
                    MOBILE RIGHT VISUAL

                    We use a smaller version underneath the text on phones.
                ========================================================== */}
                <div
                    className="
                        relative
                        mx-auto
                        flex
                        h-[470px]
                        w-full
                        max-w-[500px]
                        items-center
                        justify-center
                        lg:hidden
                    "
                >
                    <div
                        className="
                            relative
                            h-[420px]
                            w-[420px]
                            sm:h-[450px]
                            sm:w-[450px]
                        "
                    >
                        {/* MAIN CIRCLE */}
                        <div
                            className={`
                                absolute
                                left-1/2
                                top-1/2
                                h-[320px]
                                w-[320px]
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-gradient-to-br
                                sm:h-[345px]
                                sm:w-[345px]
                                ${
                                darkMode
                                    ? 'from-cyan-500 via-blue-600 to-indigo-700'
                                    : 'from-violet-400 via-indigo-500 to-purple-600'
                            }
                            `}
                        />

                        {/* OUTER RING */}
                        <div
                            className={`
                                absolute
                                left-1/2
                                top-1/2
                                h-[355px]
                                w-[355px]
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                border
                                sm:h-[380px]
                                sm:w-[380px]
                                ${
                                darkMode
                                    ? 'border-cyan-400/30'
                                    : 'border-indigo-400/30'
                            }
                            `}
                        />

                        {/* TOP CIRCLE */}
                        <div
                            className={`
                                absolute
                                right-[28px]
                                top-[18px]
                                z-40
                                h-[42px]
                                w-[42px]
                                rounded-full
                                ${
                                darkMode
                                    ? 'bg-cyan-400/80'
                                    : 'bg-indigo-300/90'
                            }
                            `}
                        />

                        {/* BOTTOM CIRCLE */}
                        <div
                            className={`
                                absolute
                                bottom-[24px]
                                left-[25px]
                                z-40
                                h-[44px]
                                w-[44px]
                                rounded-full
                                ${
                                darkMode
                                    ? 'bg-indigo-500/90'
                                    : 'bg-violet-400/90'
                            }
                            `}
                        />

                        {/* PHOTO */}
                        <div
                            className="
                                absolute
                                left-1/2
                                top-1/2
                                z-20
                                h-[320px]
                                w-[320px]
                                -translate-x-1/2
                                -translate-y-1/2
                                overflow-hidden
                                rounded-full
                                sm:h-[345px]
                                sm:w-[345px]
                            "
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}husanxon-cutout.png`}
                                alt="Husanxon Bahodirkhonov"
                                className="
                                    absolute
                                    bottom-0
                                    left-1/2
                                    h-[405px]
                                    w-auto
                                    max-w-none
                                    -translate-x-1/2
                                    object-contain
                                    object-bottom
                                    sm:h-[430px]
                                "
                            />

                            {/* MOBILE NATURAL FADE */}
                            <div
                                className={`
                                    pointer-events-none
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    z-30
                                    h-[100px]
                                    ${
                                    darkMode
                                        ? 'bg-gradient-to-t from-indigo-800 via-indigo-700/70 to-transparent'
                                        : 'bg-gradient-to-t from-indigo-500 via-indigo-500/65 to-transparent'
                                }
                                `}
                            />
                        </div>

                        {/* MOBILE QUOTE */}
                        <p
                            className={`
                                absolute
                                right-[-8px]
                                top-[100px]
                                z-50
                                w-[125px]
                                font-[cursive]
                                text-[16px]
                                font-semibold
                                leading-[1.1]
                                ${
                                darkMode
                                    ? 'text-slate-100'
                                    : 'text-[#172554]'
                            }
                            `}
                        >
                            {t.tagline}
                        </p>
                    </div>
                </div>

                {/* =========================================================
                    SCROLL DOWN INDICATOR

                    Visible immediately when Hero opens.
                ========================================================== */}
                <a
                    href="#education"
                    aria-label="Scroll to Education"
                    className={`
                        absolute
                        bottom-3
                        left-1/2
                        z-50
                        flex
                        -translate-x-1/2
                        flex-col
                        items-center
                        justify-center
                        no-underline
                        ${
                        darkMode
                            ? 'text-cyan-400'
                            : 'text-indigo-500'
                    }
                    `}
                    style={{
                        animation:
                            'heroFloat 1.5s ease-in-out infinite',
                    }}
                >
                    <span className="text-[30px] leading-none">
                        ↓
                    </span>
                </a>
            </section>
        </>
    )
}

export default Hero