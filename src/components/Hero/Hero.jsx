import {useEffect, useState} from 'react'
import {translations} from '../../data/translations.js'
import SocialIcon from '../SocialIcon/SocialIcon.jsx'

function Hero({darkMode, language}) {
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
                    px-5
                    sm:px-7
                    md:px-8
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
                        flex-col
                        md:flex-row
                        md:flex-nowrap
                        md:min-h-[calc(100vh-60px)]
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
                            pt-7
                            pb-16
                            md:w-[55%]
                            md:pt-0
                            md:pb-8
                            lg:w-[54%]
                            xl:w-[52%]
                            xl:-translate-x-1
                            xl:pb-10
                        "
                    >
                        {/* GREETING */}
                        <div
                            className={`
                                mb-5
                                flex
                                items-center
                                gap-2
                                text-[17px]
                                font-medium
                                sm:text-[19px]
                                lg:text-[20px]
                                md:text-[18px]
                                xl:text-[22px]
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
                                mb-5
                                leading-[0.9]
                                tracking-[-0.055em]
                            "
                        >
                            {/* FIRST NAME */}
                            <div
                                className={`
                                    text-[46px]
                                    font-extrabold
                                    sm:text-[56px]
                                    lg:text-[62px]
                                    md:text-[48px]
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
                                    mt-1 
                                    whitespace-nowrap
                                    text-[40px]
                                    font-extrabold
                                    sm:text-[50px]
                                    md:text-[42px]
                                    lg:text-[55px]
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
                                mb-3
                                text-[18px]
                                font-bold
                                sm:text-[20px]
                                md:text-[18px]
                                lg:text-[21px]
                                xl:text-[24px]
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
                                mb-6
                                max-w-[680px]
                                text-[15px]
                                leading-7
                                sm:text-[16px]
                                md:max-w-[420px]
                                md:text-[14px]
                                md:leading-6
                                lg:max-w-[560px]
                                lg:text-[16px]
                                lg:leading-7
                                xl:max-w-[680px]
                                xl:text-[18px] 
                                xl:leading-[1.7]
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
                                mb-6
                                flex
                                w-full
                                flex-nowrap
                                gap-3
                                sm:gap-4
                                md:w-fit
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
                                    h-[52px]
                                    min-w-0
                                    flex-1
                                    items-center
                                    justify-center
                                    gap-2
                                    whitespace-nowrap
                                    rounded-xl
                                    px-4
                                    text-[14px]
                                    sm:h-[56px]
                                    sm:px-5
                                    sm:text-[15px]
                                    md:flex-none
                                    md:px-5
                                    lg:h-[58px]
                                    lg:px-6
                                    lg:text-[16px]
                                    xl:h-[60px]
                                    xl:px-7
                                    xl:text-[17px]
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
                                    h-[52px]
                                    min-w-0
                                    flex-1
                                    whitespace-nowrap
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    px-4
                                    text-[14px]
                                    sm:h-[56px]
                                    sm:px-5
                                    sm:text-[15px]
                                    md:flex-none
                                    md:px-5
                                    lg:h-[58px]
                                    lg:px-6
                                    lg:text-[16px]
                                    xl:h-[60px]
                                    xl:px-7
                                    xl:text-[17px]
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
                                gap-3
                                sm:gap-4
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
                                        h-[48px]
                                        w-[48px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        sm:h-[52px]
                                        sm:w-[52px]
                                        lg:h-[56px]
                                        lg:w-[56px]
                                        xl:h-[60px]
                                        xl:w-[60px]
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
                                    <SocialIcon type={social.type}/>
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
                            w-full
                            items-center
                            justify-center
                            md:flex
                            md:w-[45%]
                            md:shrink-0
                            lg:w-[46%]
                            xl:w-[48%]
                            xl:translate-x-5
                        "
                    >
                        <div
                            className="
                                relative
                                h-[360px]
                                w-[360px]
                                md:h-[360px]
                                md:w-[360px]
                                lg:h-[470px]
                                lg:w-[470px]
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
                                    h-[330px]
                                    w-[330px]
                                    md:h-[330px]
                                    md:w-[330px]
                                    lg:h-[390px]
                                    lg:w-[390px]
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
                                    h-[320px]
                                    w-[320px]
                                    md:h-[320px]
                                    md:w-[320px]
                                    lg:h-[380px]
                                    lg:w-[380px]
                                    xl:h-[440px]
                                    xl:w-[440px]
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
                                    h-[370px]
                                    w-[370px]
                                    md:h-[370px]
                                    md:w-[370px]
                                    lg:h-[425px]
                                    lg:w-[425px]
                                    xl:h-[505px]
                                    xl:w-[505px]
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
                                    h-[390px]
                                    w-[390px]
                                    md:h-[390px]
                                    md:w-[390px]
                                    lg:h-[450px]
                                    lg:w-[450px]
                                    xl:h-[530px]
                                    xl:w-[530px]
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
                                    left-[calc(50%+110px)]
                                    top-[calc(50%-150px)]
                                    z-40
                                    h-[42px]
                                    w-[42px]
                                    md:h-[42px]
                                    md:w-[42px]
                                    lg:h-[48px]
                                    lg:w-[48px]
                                   xl:h-[56px]
                                   xl:w-[56px]
                                    md:left-[calc(50%+110px)]
                                    md:top-[calc(50%-150px)]
                                    lg:left-[calc(50%+135px)]
                                    lg:top-[calc(50%-180px)]
                                    xl:left-[calc(50%+155px)]
                                    xl:top-[calc(50%-215px)]
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
                                    left-[calc(50%-120px)]
                                    top-[calc(50%+145px)]
                                    md:left-[calc(50%-120px)]
                                    md:top-[calc(50%+145px)]
                                    lg:left-[calc(50%-150px)]
                                    lg:top-[calc(50%+170px)]
                                    xl:left-[calc(50%-180px)]
                                    xl:top-[calc(50%+195px)]
                                    z-40
                                    h-[44px]
                                    w-[44px]
                                    md:h-[44px]
                                    md:w-[44px]
                                    lg:h-[50px]
                                    lg:w-[50px]
                                    xl:h-[58px]
                                    xl:w-[58px]
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
                                    h-[320px]
                                    w-[320px]
                                    md:h-[320px]
                                    md:w-[320px]
                                    lg:h-[380px]
                                    lg:w-[380px]
                                    xl:h-[460px]
                                    xl:w-[460px]
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
                                        bottom-[-10px]
                                        left-1/2
                                        h-[245px]
                                        w-auto
                                        max-w-none
                                        -translate-x-1/2
                                        object-contain
                                        object-bottom
                                        sm:bottom-[10px]
                                        sm:h-[265px]
                                        xl:bottom-[-45px]
                                        xl:h-[500px]
                                         md:bottom-[12pm]
                                          md:h-[285px]
                                          lg:bottom-[-18px]
                                          lg:h-[330px]
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
                                        left-0
                                        right-0
                                        z-30
                                        h-[90px]
                                        md:h-[90px]
                                        lg:h-[120px]
                                        xl:h-[150px]
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
                                    right-[-4px]
                                    top-[58px]
                                    z-50
                                    w-[105px]
                                    md:right-[-5px]
                                    md:top-[90px]
                                     md:w-[145px]
                                     lg:right-[-35px]
                                     lg:top-[110px]
                                     lg:w-[165px]
                                     xl:right-[-70px]
                                     xl:top-[135px]
                                     xl:w-[185px]
                                     sm:right-[-2px]
                                     sm:top-[62px]
                                     sm:w-[115px]
                                "
                            >
                                <p
                                    className={`
                                        m-0
                                        font-[cursive]
                                        text-[14px]
                                        md:text-[14px]
                                        lg:text-[16px]
                                        xl:text-[20px]
                                        font-semibold
                                        leading-[1.12]
                                        tracking-[-0.02em]
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
                                    right-[5px]
                                    top-[130px]
                                    z-40
                                    h-[130px]
                                    w-[150px]
                                    md:right-[5px]
                                    md:top-[130px]
                                    md:h-[130px]
                                    md:w-[150px]
                                    lg:right-[15px]
                                    lg:top-[150px]
                                    lg:h-[150px]
                                    lg:w-[170px]
                                    xl:right-[25px]
                                    xl:top-[180px]
                                    xl:h-[170px]
                                    xl:w-[190px]
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
                         mt-2
                        flex
                        h-[350px]
                        w-full
                        max-w-[360px]
                        items-center
                        justify-center
                        md:hidden
                        mb-8
                        sm:h-[390px]
                        sm:max-w-[400px]
                    "
                >
                    <div
                        className="
                            relative
                            h-[320px]
                            w-[320px]
                            sm:h-[350px]
                            sm:w-[350px]
                        "
                    >
                        {/* MAIN CIRCLE */}
                        <div
                            className={`
                                absolute
                                left-1/2
                                top-1/2
                                h-[270px]
                                w-[270px]
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-gradient-to-br
                                sm:h-[300px]
                                sm:w-[300px]
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
                                right-[38px]
                                top-[42px]
                                z-40
                                h-[34px]
                                w-[34px]
                                sm:right-[45px]
                                sm:top-[38px]
                                sm:h-[38px]
                                sm:w-[38px]
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
                                bottom-[18px]
                                left-[38px]
                                z-40
                                h-[34px]
                                w-[34px]
                                sm:bottom-[22px]
                                sm:left-[42px]
                                sm:h-[38px]
                                sm:w-[38px]
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
                                h-[270px]
                                w-[270px]
                                -translate-x-1/2
                                -translate-y-1/2
                                overflow-hidden
                                rounded-full
                                sm:h-[300px]
                                sm:w-[300px]
                            "
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}husanxon-cutout.png`}
                                alt="Husanxon Bahodirkhonov"
                                className="
                                    absolute
                                    bottom-[10px]
                                    left-1/2
                                    h-[245px]
                                    w-auto
                                    max-w-none
                                    -translate-x-1/2
                                    object-contain
                                    object-bottom
                                    sm:bottom-[12]
                                    sm:h-[270px]
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
                                    h-[70px]
                                    sm:h-[80px]
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
                                right-[-2px]
                                top-[55px]
                                z-50
                                w-[105px]
                                font-[cursive]
                                text-[12px]
                                font-semibold
                                leading-[1.1]
                                sm:right-[-4px]
                                sm:top-[62px]
                                sm:w-[115px]
                                sm:text-[13px]
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
                        bottom-2
                        left-1/2
                        z-50
                        hidden
                        -translate-x-1/2
                        flex-col
                        items-center
                        justify-center
                        no-underline
                        xl:flex 
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