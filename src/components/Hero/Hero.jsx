// import SocialIcon from '../SocialIcon/SocialIcon.jsx'
//
// function Hero({darkMode, language}) {
//     const socialLinks = [
//         {
//             type: 'telegram',
//             label: 'Telegram',
//             href: 'https://t.me/bh_s_t',
//         },
//         {
//             type: 'instagram',
//             label: 'Instagram',
//             href: 'https://www.instagram.com/bh_s_t',
//         },
//         {
//             type: 'linkedin',
//             label: 'LinkedIn',
//             href: 'https://www.linkedin.com/in/husanxon-bahodirxonov-16256b3a8',
//         },
//         {
//             type: 'github',
//             label: 'GitHub',
//             href: 'https://github.com/Husanxon4407',
//         },
//         {
//             type: 'email',
//             label: 'Email',
//             href: 'mailto:canikissyou4407@gmail.com',
//         },
//     ]
//     return (
//         <section
//             id="home"
//             className="relative min-h-[calc(100vh-60px)]"
//         >
//             <div
//                 className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-[1400px] items-center px-5 py-10 lg:px-8">
//
//                 <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
//
//                     {/* LEFT — INTRODUCTION */}
//
//                     <div className="-translate-y-6">
//                         <p
//                             className={`mb-4 text-lg font-medium ${
//                                 darkMode
//                                     ? 'text-cyan-300'
//                                     : 'text-indigo-600'
//                             }`}
//                         >
//                             — Hello, I'm
//                         </p>
//
//                         <h1
//                             className={`text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl ${
//                                 darkMode
//                                     ? 'text-slate-100'
//                                     : 'text-slate-900'
//                             }`}
//                         >
//                             <span>
//                                  {'Husanxon'.split('').map((letter, index) => (
//                             <span
//                                    key={`first-${index}`}
//                                    className="hero-letter"
//                                      style={{
//                                    animationDelay: `${index * 0.055}s`,
//                                 }}
//                               >
//                                {letter}
//                             </span>
//                              ))}
//                             </span>
//
//                             <br/>
//
//                             <span
//                                 className={
//                                     darkMode
//                                         ? 'text-cyan-300'
//                                         : 'text-indigo-600'
//                                 }
//                             >
//                                {'Bahodirkhonov'.split('').map((letter, index) => (
//                               <span
//                                key={`last-${index}`}
//                                className="hero-letter"
//                                style={{
//                                   animationDelay: `${0.45 + index * 0.055}s`,
//                                }}
//                                  >
//                                 {letter}
//                                 </span>
//                                    ))}
//                                 </span>
//                         </h1>
//
//                         <h2
//                             className={`mt-4 text-xl font-bold sm:text-2xl ${
//                                 darkMode
//                                     ? 'text-slate-100'
//                                     : 'text-slate-800'
//                             }`}
//                         >
//                             Business Information Systems Student
//                         </h2>
//
//                         <p
//                             className={`mt-4 max-w-[600px] text-base leading-7 sm:text-lg ${
//                                 darkMode
//                                     ? 'text-slate-400'
//                                     : 'text-slate-600'
//                             }`}
//                         >
//                             I build web projects, explore data, and contribute
//                             to community initiatives. Currently studying at
//                             WIUT and focused on Full Stack Development and
//                             Data Science.
//                         </p>
//
//                         <div className="mt-7 flex flex-wrap gap-4">
//                             <a
//                                 href="#projects"
//                                 className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-600"
//                             >
//                                 View Projects
//                             </a>
//
//                             <a
//                                 href="/Husanxon-CV.pdf"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className={`rounded-lg border px-6 py-3 font-semibold no-underline transition-all duration-300 hover:-translate-y-1 ${
//                                     darkMode
//                                         ? 'border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10'
//                                         : 'border-indigo-500 text-indigo-600 hover:bg-indigo-500/5'
//                                 }`}
//                             >
//                                 Download CV
//                             </a>
//                         </div>
//                         <div className="mt-7 flex flex-wrap items-center gap-4">
//                             {socialLinks.map((link) => (
//                                 <a
//                                     key={link.type}
//                                     href={link.href}
//                                     target={link.type === 'email' ? undefined : '_blank'}
//                                     rel={
//                                         link.type === 'email'
//                                             ? undefined
//                                             : 'noopener noreferrer'
//                                     }
//                                     aria-label={link.label}
//                                     title={link.label}
//                                     className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 ${
//                                         darkMode
//                                             ? 'bg-white/10 text-cyan-300 hover:bg-white/15'
//                                             : 'bg-white/80 text-indigo-600 shadow-sm hover:bg-white'
//                                     }`}
//                                 >
//                                     <SocialIcon type={link.type}/>
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//
//                     {/* RIGHT — PORTRAIT */}
//
//                     <div className="relative flex justify-center lg:justify-center">
//                         <div className="relative h-[620px] w-[620px]">
//
//                             {/* SHAPE 1 — LARGE BLUE BACKGROUND */}
//
//                             <div
//                                 className={`absolute left-[135px] top-[35px] h-[440px] w-[365px] rotate-[7deg] rounded-[48%_52%_45%_55%/38%_42%_58%_62%] ${
//                                     darkMode
//                                         ? 'bg-cyan-500/80'
//                                         : 'bg-blue-500/90'
//                                 }`}
//                             />
//
//                             {/* SHAPE 2 — RIGHT PURPLE/BLUE SHAPE */}
//
//                             <div
//                                 className={`absolute right-[65px] top-[175px] h-[365px] w-[310px] rotate-[25deg] rounded-[55%_45%_48%_52%/45%_55%_45%_55%] ${
//                                     darkMode
//                                         ? 'bg-indigo-600/85'
//                                         : 'bg-indigo-600/90'
//                                 }`}
//                             />
//
//                             {/* SHAPE 3 — LOWER LEFT PURPLE SHAPE */}
//
//                             <div
//                                 className={`absolute bottom-[70px] left-[35px] h-[275px] w-[335px] rotate-[-18deg] rounded-[55%_45%_52%_48%/48%_52%_48%_52%] ${
//                                     darkMode
//                                         ? 'bg-indigo-500/80'
//                                         : 'bg-violet-500/90'
//                                 }`}
//                             />
//
//                             {/* PORTRAIT CLIPPING AREA */}
//
//                             <div
//                                 className="absolute bottom-[70px] left-[105px] z-10 h-[500px] w-[450px] overflow-hidden rounded-[48%_52%_42%_58%/30%_38%_62%_70%]">
//
//                                 <img
//                                     src={`${import.meta.env.BASE_URL}husanxon-cutout.png`}
//                                     alt="Husanxon Bahodirkhonov"
//                                     className="absolute left-1/2 top-[-10px] h-[700px] w-auto max-w-none -translate-x-1/2 object-contain"
//                                 />
//
//                             </div>
//
//                             {/* SAME PERSON — BIGGER GOALS */}
//
//                             <div
//                                 className={`absolute right-[-5px] top-[105px] z-20 rotate-[-6deg] ${
//                                     darkMode
//                                         ? 'text-slate-200'
//                                         : 'text-slate-800'
//                                 }`}
//                             >
//
//                                 <p className="m-0 font-[cursive] text-xl leading-6 sm:text-2xl">
//                                     Same person.
//                                 </p>
//
//                                 <p className="m-0 mt-1 font-[cursive] text-xl leading-6 sm:text-2xl">
//                                     Bigger goals.
//                                 </p>
//
//                                 {/* CURVED CONNECTION */}
//
//                                 <svg
//                                     className="absolute right-[5px] top-[65px] h-[100px] w-[125px]"
//                                     viewBox="0 0 125 100"
//                                     fill="none"
//                                     aria-hidden="true"
//                                 >
//                                     <path
//                                         d="M118 8 C108 38 88 55 58 65 C40 71 22 76 7 91"
//                                         stroke="currentColor"
//                                         strokeWidth="1.5"
//                                         strokeLinecap="round"
//                                     />
//
//                                     <circle
//                                         cx="7"
//                                         cy="91"
//                                         r="5"
//                                         className={
//                                             darkMode
//                                                 ? 'fill-cyan-400'
//                                                 : 'fill-blue-500'
//                                         }
//                                     />
//                                 </svg>
//
//                             </div>
//
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }
//
// export default Hero

// import { translations } from '../../data/translations.js'
// import SocialIcon from '../SocialIcon/SocialIcon.jsx'
//
//
// function Hero({ darkMode, language }) {
//     const t = translations[language]
//
//     const socialLinks = [
//         {
//             type: 'telegram',
//             label: 'Telegram',
//             href: 'https://t.me/bh_s_t',
//         },
//         {
//             type: 'instagram',
//             label: 'Instagram',
//             href: 'https://www.instagram.com/bh_s_t',
//         },
//         {
//             type: 'linkedin',
//             label: 'LinkedIn',
//             href: 'https://www.linkedin.com/in/husanxon-bahodirxonov-16256b3a8',
//         },
//         {
//             type: 'github',
//             label: 'GitHub',
//             href: 'https://github.com/Husanxon4407',
//         },
//         {
//             type: 'email',
//             label: 'Email',
//             href: 'mailto:canikissyou4407@gmail.com',
//         },
//     ]
//
//     return (
//         <section
//             id="home"
//             className="relative min-h-[calc(100vh-60px)]"
//         >
//             <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-[1400px] items-center px-5 py-10 lg:px-8">
//
//                 <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
//
//                     {/* ==================================================
//                         LEFT — INTRODUCTION
//                     ================================================== */}
//
//                     <div className="-translate-y-6">
//
//                         {/* GREETING */}
//
//                         <p
//                             className={`mb-4 text-lg font-medium ${
//                                 darkMode
//                                     ? 'text-cyan-300'
//                                     : 'text-indigo-600'
//                             }`}
//                         >
//                             — {t.hero.greeting}
//                         </p>
//
//
//                         {/* ==================================================
//                             NAME — LETTER BY LETTER
//                         ================================================== */}
//
//                         <h1
//                             className={`text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl ${
//                                 darkMode
//                                     ? 'text-slate-100'
//                                     : 'text-slate-900'
//                             }`}
//                         >
//
//                             {/* FIRST NAME */}
//
//                             <span>
//                                 {'Husanxon'.split('').map((letter, index) => (
//                                     <span
//                                         key={`first-${index}`}
//                                         className="hero-letter"
//                                         style={{
//                                             animationDelay: `${index * 0.055}s`,
//                                         }}
//                                     >
//                                         {letter}
//                                     </span>
//                                 ))}
//                             </span>
//
//
//                             <br />
//
//
//                             {/* LAST NAME */}
//
//                             <span
//                                 className={
//                                     darkMode
//                                         ? 'text-cyan-300'
//                                         : 'text-indigo-600'
//                                 }
//                             >
//                                 {'Bahodirkhonov'.split('').map(
//                                     (letter, index) => (
//                                         <span
//                                             key={`last-${index}`}
//                                             className="hero-letter"
//                                             style={{
//                                                 animationDelay: `${
//                                                     0.45 +
//                                                     index * 0.055
//                                                 }s`,
//                                             }}
//                                         >
//                                             {letter}
//                                         </span>
//                                     ),
//                                 )}
//                             </span>
//
//                         </h1>
//
//
//                         {/* ==================================================
//                             CONTENT AFTER NAME
//                             Appears immediately after name animation
//                         ================================================== */}
//
//                         <div className="hero-after-name">
//
//                             {/* TITLE */}
//
//                             <h2
//                                 className={`mt-4 text-xl font-bold sm:text-2xl ${
//                                     darkMode
//                                         ? 'text-slate-100'
//                                         : 'text-slate-800'
//                                 }`}
//                             >
//                                 {t.hero.title}
//                             </h2>
//
//
//                             {/* DESCRIPTION */}
//
//                             <p
//                                 className={`mt-4 max-w-[600px] text-base leading-7 sm:text-lg ${
//                                     darkMode
//                                         ? 'text-slate-400'
//                                         : 'text-slate-600'
//                                 }`}
//                             >
//                                 {t.hero.description}
//                             </p>
//
//
//                             {/* ==================================================
//                                 BUTTONS
//                             ================================================== */}
//
//                             <div className="mt-7 flex flex-wrap gap-4">
//
//                                 {/* VIEW PROJECTS */}
//
//                                 <a
//                                     href="#projects"
//                                     className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-600"
//                                 >
//                                     {t.hero.projectsButton}
//                                 </a>
//
//
//                                 {/* DOWNLOAD CV */}
//
//                                 <a
//                                     href={`${import.meta.env.BASE_URL}Husanxon-Bahodirkhonov-CV.pdf`}
//                                     download
//                                     className={`rounded-lg border px-6 py-3 font-semibold no-underline transition-all duration-300 hover:-translate-y-1 ${
//                                         darkMode
//                                             ? 'border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10'
//                                             : 'border-indigo-500 text-indigo-600 hover:bg-indigo-500/5'
//                                     }`}
//                                 >
//                                     {t.hero.cvButton}
//                                 </a>
//
//                             </div>
//
//
//                             {/* ==================================================
//                                 SOCIAL LINKS
//                             ================================================== */}
//
//                             <div className="mt-7 flex flex-wrap items-center gap-4">
//
//                                 {socialLinks.map((link) => (
//                                     <a
//                                         key={link.type}
//                                         href={link.href}
//                                         target={
//                                             link.type === 'email'
//                                                 ? undefined
//                                                 : '_blank'
//                                         }
//                                         rel={
//                                             link.type === 'email'
//                                                 ? undefined
//                                                 : 'noopener noreferrer'
//                                         }
//                                         aria-label={link.label}
//                                         title={link.label}
//                                         className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 ${
//                                             darkMode
//                                                 ? 'bg-white/10 text-cyan-300 hover:bg-white/15'
//                                                 : 'bg-white/80 text-indigo-600 shadow-sm hover:bg-white'
//                                         }`}
//                                     >
//                                         <SocialIcon type={link.type} />
//                                     </a>
//                                 ))}
//
//                             </div>
//
//                         </div>
//
//                     </div>
//
//
//                     {/* ==================================================
//                         RIGHT — PORTRAIT
//                     ================================================== */}
//
//                     <div className="relative flex justify-center lg:justify-center">
//
//                         <div className="relative h-[620px] w-[620px]">
//
//                             {/* ==================================================
//                                 SHAPE 1 — LARGE BLUE BACKGROUND
//                             ================================================== */}
//
//                             <div
//                                 className={`absolute left-[135px] top-[35px] h-[440px] w-[365px] rotate-[7deg] rounded-[48%_52%_45%_55%/38%_42%_58%_62%] ${
//                                     darkMode
//                                         ? 'bg-cyan-500/80'
//                                         : 'bg-blue-500/90'
//                                 }`}
//                             />
//
//
//                             {/* ==================================================
//                                 SHAPE 2 — RIGHT PURPLE / BLUE
//                             ================================================== */}
//
//                             <div
//                                 className={`absolute right-[65px] top-[175px] h-[365px] w-[310px] rotate-[25deg] rounded-[55%_45%_48%_52%/45%_55%_45%_55%] ${
//                                     darkMode
//                                         ? 'bg-indigo-600/85'
//                                         : 'bg-indigo-600/90'
//                                 }`}
//                             />
//
//
//                             {/* ==================================================
//                                 SHAPE 3 — LOWER LEFT PURPLE
//                             ================================================== */}
//
//                             <div
//                                 className={`absolute bottom-[70px] left-[35px] h-[275px] w-[335px] rotate-[-18deg] rounded-[55%_45%_52%_48%/48%_52%_48%_52%] ${
//                                     darkMode
//                                         ? 'bg-indigo-500/80'
//                                         : 'bg-violet-500/90'
//                                 }`}
//                             />
//
//
//                             {/* ==================================================
//                                 PORTRAIT
//                             ================================================== */}
//
//                             <div className="absolute bottom-[70px] left-[105px] z-10 h-[500px] w-[450px] overflow-hidden rounded-[48%_52%_42%_58%/30%_38%_62%_70%]">
//
//                                 <img
//                                     src={`${import.meta.env.BASE_URL}husanxon-cutout.png`}
//                                     alt="Husanxon Bahodirkhonov"
//                                     className="absolute left-1/2 top-[-10px] h-[700px] w-auto max-w-none -translate-x-1/2 object-contain"
//                                 />
//
//                             </div>
//
//
//                             {/* ==================================================
//                                 SAME PERSON — BIGGER GOALS
//                             ================================================== */}
//
//                             <div
//                                 className={`absolute right-[-5px] top-[105px] z-20 rotate-[-6deg] ${
//                                     darkMode
//                                         ? 'text-slate-200'
//                                         : 'text-slate-800'
//                                 }`}
//                             >
//
//                                 <p className="m-0 font-[cursive] text-xl leading-6 sm:text-2xl">
//                                     Same person.
//                                 </p>
//
//                                 <p className="m-0 mt-1 font-[cursive] text-xl leading-6 sm:text-2xl">
//                                     Bigger goals.
//                                 </p>
//
//
//                                 {/* CURVED CONNECTION */}
//
//                                 <svg
//                                     className="absolute right-[5px] top-[65px] h-[100px] w-[125px]"
//                                     viewBox="0 0 125 100"
//                                     fill="none"
//                                     aria-hidden="true"
//                                 >
//                                     <path
//                                         d="M118 8 C108 38 88 55 58 65 C40 71 22 76 7 91"
//                                         stroke="currentColor"
//                                         strokeWidth="1.5"
//                                         strokeLinecap="round"
//                                     />
//
//                                     <circle
//                                         cx="7"
//                                         cy="91"
//                                         r="5"
//                                         className={
//                                             darkMode
//                                                 ? 'fill-cyan-400'
//                                                 : 'fill-blue-500'
//                                         }
//                                     />
//                                 </svg>
//
//                             </div>
//
//                         </div>
//
//                     </div>
//
//                 </div>
//
//             </div>
//
//
//             {/* ==========================================================
//                 SCROLL DOWN INDICATOR
//             ========================================================== */}
//
//             <a
//                 href="#education"
//                 aria-label="Scroll to education"
//                 className={`hero-scroll-indicator absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center justify-center no-underline ${
//                     darkMode
//                         ? 'text-cyan-300'
//                         : 'text-indigo-600'
//                 }`}
//             >
//                 <svg
//                     width="30"
//                     height="30"
//                     viewBox="0 0 30 30"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                 >
//                     <path
//                         d="M15 5V22"
//                         stroke="currentColor"
//                         strokeWidth="2.5"
//                         strokeLinecap="round"
//                     />
//
//                     <path
//                         d="M8 16L15 23L22 16"
//                         stroke="currentColor"
//                         strokeWidth="2.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     />
//                 </svg>
//             </a>
//
//         </section>
//     )
// }
//
// export default Hero

import { useEffect, useState } from 'react'
import { translations } from '../../data/translations.js'
import SocialIcon from '../SocialIcon/SocialIcon.jsx'

function Hero({ darkMode, language }) {
    const t = translations[language].hero

    // =========================================================
    // NAME TYPING ANIMATION
    // =========================================================

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [showRest, setShowRest] = useState(false)

    useEffect(() => {
        let firstTimer = null
        let lastTimer = null
        let finishTimer = null

        let firstIndex = 0
        let lastIndex = 0

        // Reset animation whenever language changes
        setFirstName('')
        setLastName('')
        setShowRest(false)

        // -----------------------------------------------------
        // TYPE FIRST NAME
        // -----------------------------------------------------

        const typeFirstName = () => {
            if (firstIndex < t.titleFirst.length) {
                firstIndex += 1

                setFirstName(
                    t.titleFirst.slice(0, firstIndex)
                )

                firstTimer = setTimeout(
                    typeFirstName,
                    75
                )
            } else {
                // Small pause between first and last name
                lastTimer = setTimeout(
                    typeLastName,
                    130
                )
            }
        }

        // -----------------------------------------------------
        // TYPE LAST NAME
        // -----------------------------------------------------

        const typeLastName = () => {
            if (lastIndex < t.titleLast.length) {
                lastIndex += 1

                setLastName(
                    t.titleLast.slice(0, lastIndex)
                )

                lastTimer = setTimeout(
                    typeLastName,
                    75
                )
            } else {
                // Name is completely finished.
                // Everything else appears immediately.
                finishTimer = setTimeout(() => {
                    setShowRest(true)
                }, 80)
            }
        }

        // Start typing
        firstTimer = setTimeout(
            typeFirstName,
            180
        )

        // -----------------------------------------------------
        // CLEANUP
        // -----------------------------------------------------

        return () => {
            clearTimeout(firstTimer)
            clearTimeout(lastTimer)
            clearTimeout(finishTimer)
        }
    }, [language, t.titleFirst, t.titleLast])

    // =========================================================
    // SOCIAL LINKS
    // =========================================================

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
            className="relative min-h-[calc(100vh-60px)] overflow-hidden"
        >
            {/* =====================================================
                HERO ANIMATIONS
            ====================================================== */}

            <style>
                {`
                    /* ---------------------------------------------
                       Everything after the name
                    --------------------------------------------- */

                    @keyframes heroReveal {
                        from {
                            opacity: 0;
                            transform: translateY(12px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    /* ---------------------------------------------
                       Down arrow
                    --------------------------------------------- */

                    @keyframes heroArrow {
                        0%,
                        100% {
                            transform: translateY(0);
                            opacity: 0.55;
                        }

                        50% {
                            transform: translateY(9px);
                            opacity: 1;
                        }
                    }

                    /* ---------------------------------------------
                       Typing cursor
                    --------------------------------------------- */

                    @keyframes heroCursor {
                        0%,
                        49% {
                            opacity: 1;
                        }

                        50%,
                        100% {
                            opacity: 0;
                        }
                    }

                    .hero-reveal {
                        animation:
                            heroReveal
                            0.45s
                            cubic-bezier(0.22, 1, 0.36, 1)
                            forwards;
                    }

                    .hero-arrow {
                        animation:
                            heroArrow
                            1.5s
                            ease-in-out
                            infinite;
                    }

                    /* ---------------------------------------------
                       Reduced motion
                    --------------------------------------------- */

                    @media (prefers-reduced-motion: reduce) {
                        .hero-reveal {
                            animation: none;
                            opacity: 1;
                        }

                        .hero-arrow {
                            animation: none;
                            opacity: 1;
                        }
                    }
                `}
            </style>

            {/* =====================================================
                MAIN HERO CONTAINER
            ====================================================== */}

            <div
                className="
                    mx-auto
                    flex
                    min-h-[calc(100vh-60px)]
                    w-full
                    max-w-[1480px]
                    items-center
                    px-6
                    py-12
                    sm:px-8
                    lg:px-12
                    xl:px-16
                "
            >
                <div
                    className="
                        grid
                        w-full
                        items-center
                        gap-10
                        lg:grid-cols-[1.02fr_0.98fr]
                        lg:gap-8
                        xl:gap-4
                        -translate-y-5
                    "
                >

                    {/* =================================================
                        LEFT SIDE
                    ================================================== */}

                    <div className="-translate-y-5 lg:-translate-y-8">

                        {/* ---------------------------------------------
                            GREETING
                        --------------------------------------------- */}

                        <p
                            className={`
                                mb-5
                                text-lg
                                font-medium
                                sm:text-xl
                                ${
                                darkMode
                                    ? 'text-cyan-300'
                                    : 'text-indigo-600'
                            }
                            `}
                        >
                            — {t.greeting}
                        </p>


                        {/* =================================================
                            NAME
                        ================================================== */}

                        <h1
                            className={`
                                m-0
                                text-5xl
                                font-extrabold
                                leading-[0.98]
                                tracking-[-0.035em]
                                sm:text-6xl
                                lg:text-[4.6rem]
                                xl:text-[5rem]
                                ${
                                darkMode
                                    ? 'text-slate-100'
                                    : 'text-slate-950'
                            }
                            `}
                        >

                            {/* -----------------------------------------
                                FIRST NAME
                            ------------------------------------------ */}

                            <span>
                                {firstName}
                            </span>

                            <br />

                            {/* -----------------------------------------
                                LAST NAME
                            ------------------------------------------ */}

                            <span
                                className={
                                    darkMode
                                        ? 'text-cyan-300'
                                        : 'text-indigo-600'
                                }
                            >
                                {lastName}
                            </span>

                            {/* -----------------------------------------
                                TYPING CURSOR
                            ------------------------------------------ */}

                            {!showRest && (
                                <span
                                    className={`
                                        ml-1
                                        inline-block
                                        h-[0.85em]
                                        w-[3px]
                                        translate-y-[0.04em]
                                        align-middle
                                        ${
                                        darkMode
                                            ? 'bg-cyan-300'
                                            : 'bg-indigo-600'
                                    }
                                    `}
                                    style={{
                                        animation:
                                            'heroCursor 0.8s steps(1) infinite',
                                    }}
                                    aria-hidden="true"
                                />
                            )}

                        </h1>


                        {/* =================================================
                            EVERYTHING AFTER NAME
                        ================================================== */}

                        {showRest && (
                            <div className="hero-reveal">

                                {/* -----------------------------------------
                                    ROLE
                                ------------------------------------------ */}

                                <h2
                                    className={`
                                        mt-6
                                        text-xl
                                        font-bold
                                        leading-tight
                                        sm:text-2xl
                                        ${
                                        darkMode
                                            ? 'text-slate-100'
                                            : 'text-slate-900'
                                    }
                                    `}
                                >
                                    {t.role}
                                </h2>


                                {/* -----------------------------------------
                                    DESCRIPTION
                                ------------------------------------------ */}

                                <p
                                    className={`
                                        mt-4
                                        max-w-[620px]
                                        text-base
                                        leading-7
                                        sm:text-lg
                                        ${
                                        darkMode
                                            ? 'text-slate-400'
                                            : 'text-slate-600'
                                    }
                                    `}
                                >
                                    {t.description}
                                </p>


                                {/* =================================================
                                    BUTTONS
                                ================================================== */}

                                <div className="mt-7 flex flex-wrap gap-4">

                                    {/* -----------------------------------------
                                        VIEW PROJECTS
                                    ------------------------------------------ */}

                                    <a
                                        href="#projects"
                                        className="
                                            inline-flex
                                            items-center
                                            gap-3
                                            rounded-lg
                                            bg-indigo-500
                                            px-6
                                            py-3.5
                                            font-semibold
                                            text-white
                                            no-underline
                                            shadow-sm
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:bg-indigo-600
                                            hover:shadow-lg
                                        "
                                    >
                                        <span>
                                            {t.viewProjects}
                                        </span>

                                        <span
                                            className="text-lg"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>
                                    </a>


                                    {/* -----------------------------------------
                                        DOWNLOAD CV
                                    ------------------------------------------ */}

                                    <a
                                        href={`${import.meta.env.BASE_URL}Husanxon-CV.pdf`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                            inline-flex
                                            items-center
                                            rounded-lg
                                            border
                                            px-6
                                            py-3.5
                                            font-semibold
                                            no-underline
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            ${
                                            darkMode
                                                ? `
                                                        border-cyan-400/50
                                                        text-cyan-300
                                                        hover:bg-cyan-400/10
                                                    `
                                                : `
                                                        border-indigo-500
                                                        text-indigo-600
                                                        hover:bg-indigo-500/5
                                                    `
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
                                        mt-7
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-4
                                    "
                                >
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.type}
                                            href={link.href}
                                            target={
                                                link.type === 'email'
                                                    ? undefined
                                                    : '_blank'
                                            }
                                            rel={
                                                link.type === 'email'
                                                    ? undefined
                                                    : 'noopener noreferrer'
                                            }
                                            aria-label={link.label}
                                            title={link.label}
                                            className={`
                                                flex
                                                h-14
                                                w-14
                                                items-center
                                                justify-center
                                                rounded-full
                                                transition-all
                                                duration-300
                                                hover:-translate-y-1
                                                ${
                                                darkMode
                                                    ? `
                                                            bg-white/10
                                                            text-cyan-300
                                                            shadow-sm
                                                            hover:bg-white/15
                                                        `
                                                    : `
                                                            bg-white/85
                                                            text-indigo-600
                                                            shadow-sm
                                                            hover:bg-white
                                                            hover:shadow-md
                                                        `
                                            }
                                            `}
                                        >
                                            <SocialIcon
                                                type={link.type}
                                            />
                                        </a>
                                    ))}
                                </div>

                            </div>
                        )}

                    </div>


                    {/* =================================================
                        RIGHT SIDE — VISUAL
                    ================================================== */}

                    <div
                        className="
                            relative
                            flex
                            justify-center
                            lg:justify-end
                        "
                    >

                        <div
                            className="
                                relative
                                h-[570px]
                                w-[570px]
                                sm:h-[620px]
                                sm:w-[620px]
                                lg:-mr-2
                                xl:-mr-6
                            "
                        >

                            {/* =================================================
                                SHAPE 1 — LARGE BLUE BACKGROUND
                            ================================================== */}

                            <div
                                className={`
                                    absolute
                                    left-[125px]
                                    top-[35px]
                                    h-[455px]
                                    w-[355px]
                                    rotate-[7deg]
                                    rounded-[48%_52%_45%_55%/38%_42%_58%_62%]
                                    ${
                                    darkMode
                                        ? 'bg-cyan-500/75'
                                        : 'bg-blue-500/90'
                                }
                                `}
                            />


                            {/* =================================================
                                SHAPE 2 — RIGHT PURPLE / BLUE
                            ================================================== */}

                            <div
                                className={`
                                    absolute
                                    right-[45px]
                                    top-[180px]
                                    h-[365px]
                                    w-[315px]
                                    rotate-[23deg]
                                    rounded-[55%_45%_48%_52%/45%_55%_45%_55%]
                                    ${
                                    darkMode
                                        ? 'bg-indigo-600/85'
                                        : 'bg-indigo-600/90'
                                }
                                `}
                            />


                            {/* =================================================
                                SHAPE 3 — LOWER LEFT PURPLE
                            ================================================== */}

                            <div
                                className={`
                                    absolute
                                    bottom-[55px]
                                    left-[25px]
                                    h-[285px]
                                    w-[340px]
                                    rotate-[-18deg]
                                    rounded-[55%_45%_52%_48%/48%_52%_48%_52%]
                                    ${
                                    darkMode
                                        ? 'bg-violet-500/80'
                                        : 'bg-violet-500/90'
                                }
                                `}
                            />


                            {/* =================================================
                                PORTRAIT
                            ================================================== */}

                            <div
                                className="
                                    absolute
                                    bottom-[45px]
                                    left-[90px]
                                    z-10
                                    h-[510px]
                                    w-[455px]
                                    overflow-hidden
                                    rounded-[48%_52%_42%_58%/30%_38%_62%_70%]
                                "
                            >
                                <img
                                    src={`${import.meta.env.BASE_URL}husanxon-cutout.png`}
                                    alt="Husanxon Bahodirkhonov"
                                    className="
                                        absolute
                                        left-1/2
                                        top-[-5px]
                                        h-[700px]
                                        w-auto
                                        max-w-none
                                        -translate-x-1/2
                                        object-contain
                                    "
                                />
                            </div>


                            {/* =================================================
                                TAGLINE
                            ================================================== */}

                            {showRest && (
                                <div
                                    className={`
                                        hero-reveal
                                        absolute
                                        right-[-5px]
                                        top-[105px]
                                        z-20
                                        rotate-[-6deg]
                                        ${
                                        darkMode
                                            ? 'text-slate-200'
                                            : 'text-slate-900'
                                    }
                                    `}
                                >

                                    <p
                                        className="
                                            m-0
                                            whitespace-nowrap
                                            font-[cursive]
                                            text-xl
                                            leading-6
                                            sm:text-2xl
                                        "
                                    >
                                        {t.tagline.split('. ')[0]}.
                                    </p>

                                    <p
                                        className="
                                            m-0
                                            mt-1
                                            whitespace-nowrap
                                            font-[cursive]
                                            text-xl
                                            leading-6
                                            sm:text-2xl
                                        "
                                    >
                                        {t.tagline.split('. ')[1]}
                                    </p>


                                    {/* -----------------------------------------
                                        CURVED LINE
                                    ------------------------------------------ */}

                                    <svg
                                        className="
                                            absolute
                                            right-[2px]
                                            top-[58px]
                                            h-[105px]
                                            w-[135px]
                                        "
                                        viewBox="0 0 135 105"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="
                                                M128 7
                                                C118 38 96 57 67 68
                                                C46 76 26 82 7 98
                                            "
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />

                                        <circle
                                            cx="7"
                                            cy="98"
                                            r="5"
                                            className={
                                                darkMode
                                                    ? 'fill-cyan-400'
                                                    : 'fill-blue-500'
                                            }
                                        />
                                    </svg>

                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </div>


            {/* =========================================================
                DOWN ARROW
            ========================================================== */}

            <a
                href="#education"
                aria-label="Scroll to education"
                className={`
                    hero-arrow
                    absolute
                    bottom-7
                    left-1/2
                    flex
                    -translate-x-1/2
                    flex-col
                    items-center
                    justify-center
                    no-underline
                    ${
                    darkMode
                        ? 'text-cyan-300'
                        : 'text-indigo-600'
                }
                `}
            >
                <span
                    className="
                        text-3xl
                        font-light
                        leading-none
                    "
                >
                    ↓
                </span>
            </a>

        </section>
    )
}

export default Hero