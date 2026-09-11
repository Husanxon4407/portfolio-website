import { translations } from '../../data/translations.js'

import school26 from '../../assets/education/school-26.png'
import hardwork from '../../assets/education/hardwork-learning-center.png'
import wiut from '../../assets/education/westminster-international-university.png'
import najot from '../../assets/education/najot-talim.png'
import school21 from '../../assets/education/school-21.png'


function Education({ darkMode, language }) {
    const t = translations[language].education

    const milestones = [
        {
            id: 'school26',
            ...t.milestones.school26,
            image: school26,
        },
        {
            id: 'hardwork',
            ...t.milestones.hardwork,
            image: hardwork,
        },
        {
            id: 'wiut',
            ...t.milestones.wiut,
            image: wiut,
        },
        {
            id: 'najot',
            ...t.milestones.najot,
            image: najot,
        },
        {
            id: 'school21',
            ...t.milestones.school21,
            image: school21,
        },
    ]

    return (
        <section
            id="education"
            className={`
                relative
                w-full
                overflow-hidden
                px-4
                py-16
                sm:px-6
                sm:py-20
                lg:px-8
                xl:px-12
            `}
        >
            <div
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
                    ${
                    darkMode
                        ? 'border-cyan-400/20 bg-[#08131f]/65 shadow-[0_20px_70px_rgba(0,0,0,0.18)]'
                        : 'border-indigo-300/30 bg-white/65 shadow-[0_20px_70px_rgba(99,102,241,0.08)]'
                }
                    backdrop-blur-[4px]
                `}
            >

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="relative z-10 mx-auto mb-10 max-w-[900px] text-center sm:mb-12">

                    {/* LABEL */}

                    <div
                        className={`
                            mb-3
                            flex
                            items-center
                            justify-center
                            gap-3
                            text-[12px]
                            font-bold
                            tracking-[0.18em]
                            sm:text-[13px]
                            ${
                            darkMode
                                ? 'text-cyan-300'
                                : 'text-indigo-600'
                        }
                        `}
                    >
                        <span className="h-px w-7 bg-current sm:w-9" />

                        <span>{t.label}</span>

                        <span className="h-px w-7 bg-current sm:w-9" />
                    </div>


                    {/* TITLE */}

                    <h2
                        className={`
                            m-0
                            text-[30px]
                            font-extrabold
                            leading-[1.05]
                            tracking-[-0.035em]
                            sm:text-[38px]
                            md:text-[42px]
                            lg:text-[46px]
                            ${
                            darkMode
                                ? 'text-slate-100'
                                : 'text-[#071126]'
                        }
                        `}
                    >
                        <span>{t.titleFirst} </span>

                        <span
                            className={
                                darkMode
                                    ? 'text-cyan-300'
                                    : 'text-indigo-600'
                            }
                        >
                            {t.titleHighlight}
                        </span>
                    </h2>


                    {/* SUBTITLE */}

                    <p
                        className={`
                            mx-auto
                            mt-3
                            max-w-[760px]
                            text-[13px]
                            leading-6
                            sm:text-[15px]
                            ${
                            darkMode
                                ? 'text-slate-400'
                                : 'text-slate-600'
                        }
                        `}
                    >
                        {t.subtitle}
                    </p>

                </div>


                {/* =====================================================
                    DESKTOP
                    5 ITEMS IN ONE HORIZONTAL LINE
                ====================================================== */}

                <div className="relative hidden min-[1280px]:block">

                    {/* MAIN HORIZONTAL LINE */}

                    <div
                        className={`
                            absolute
                            left-[10%]
                            right-[10%]
                            top-[92px]
                            h-px
                            ${
                            darkMode
                                ? 'bg-cyan-400/40'
                                : 'bg-indigo-400/50'
                        }
                        `}
                    />

                    <div className="relative grid grid-cols-5 gap-4 2xl:gap-8">

                        {milestones.map((item, index) => (
                            <EducationDesktopItem
                                key={item.id}
                                item={item}
                                index={index}
                                darkMode={darkMode}
                            />
                        ))}

                    </div>

                </div>


                {/* =====================================================
                    TABLET / HALF SCREEN
                    ZIG-ZAG DESIGN
                ====================================================== */}

                <div className="relative hidden min-[640px]:block min-[1280px]:hidden">

                    <div className="relative mx-auto max-w-[700px]">

                        {/* TOP ROW */}

                        <div className="grid grid-cols-2 gap-10">

                            <EducationTabletItem
                                item={milestones[0]}
                                darkMode={darkMode}
                                align="left"
                            />

                            <EducationTabletItem
                                item={milestones[1]}
                                darkMode={darkMode}
                                align="right"
                            />

                        </div>


                        {/* CENTER ITEM */}

                        <div className="relative z-20 mx-auto mt-8 w-fit">

                            <EducationTabletItem
                                item={milestones[4]}
                                darkMode={darkMode}
                                align="center"
                            />

                        </div>


                        {/* BOTTOM ROW */}

                        <div className="mt-8 grid grid-cols-2 gap-10">

                            <EducationTabletItem
                                item={milestones[2]}
                                darkMode={darkMode}
                                align="left"
                            />

                            <EducationTabletItem
                                item={milestones[3]}
                                darkMode={darkMode}
                                align="right"
                            />

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    MOBILE
                    VERTICAL TIMELINE
                ====================================================== */}

                <div className="relative min-[640px]:hidden">

                    {/* VERTICAL LINE */}

                    <div
                        className={`
                            absolute
                            bottom-6
                            left-[25px]
                            top-6
                            w-px
                            ${
                            darkMode
                                ? 'bg-cyan-400/45'
                                : 'bg-indigo-400/45'
                        }
                        `}
                    />

                    <div className="relative flex flex-col gap-7">

                        {milestones.map((item, index) => (
                            <EducationMobileItem
                                key={item.id}
                                item={item}
                                index={index}
                                darkMode={darkMode}
                            />
                        ))}

                    </div>

                </div>

            </div>
        </section>
    )
}


/* ================================================================
   DESKTOP ITEM
================================================================ */

function EducationDesktopItem({ item, index, darkMode }) {
    return (
        <div className="relative flex flex-col items-center text-center">

            {/* YEAR */}

            <div
                className={`
                    mb-3
                    text-[14px]
                    font-bold
                    ${
                    index % 2 === 0
                        ? darkMode
                            ? 'text-cyan-300'
                            : 'text-blue-600'
                        : darkMode
                            ? 'text-violet-300'
                            : 'text-violet-600'
                }
                `}
            >
                {item.year}
            </div>


            {/* NODE */}

            <div
                className={`
                    relative
                    z-20
                    mb-3
                    flex
                    h-[16px]
                    w-[16px]
                    items-center
                    justify-center
                    rounded-full
                    ${
                    darkMode
                        ? 'bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.55)]'
                        : 'bg-indigo-500 shadow-[0_0_14px_rgba(79,70,229,0.35)]'
                }
                `}
            >
                <div className="h-[6px] w-[6px] rounded-full bg-white" />
            </div>


            {/* IMAGE */}

            <div
                className={`
                    mb-4
                    h-[132px]
                    w-[132px]
                    2xl:h-[142px]
                    2xl:w-[142px]
                    overflow-hidden
                    rounded-full
                    border-[3px]
                    p-[3px]
                    shadow-lg
                    ${
                    darkMode
                        ? 'border-cyan-300/70 shadow-cyan-500/10'
                        : 'border-white shadow-indigo-300/40'
                }
                `}
            >
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full rounded-full object-cover"
                />
            </div>


            {/* NAME */}

            <h3
                className={`
                    m-0
                    max-w-[190px]
                    text-[15px]
                    font-extrabold
                    leading-5
                    ${
                    darkMode
                        ? 'text-slate-100'
                        : 'text-[#172554]'
                }
                `}
            >
                {item.name}
            </h3>


            {/* LOCATION */}

            <p
                className={`
                    mt-1
                    max-w-[190px]
                    text-[12px]
                    leading-5
                    ${
                    darkMode
                        ? 'text-slate-400'
                        : 'text-slate-500'
                }
                `}
            >
                {item.location}
            </p>

        </div>
    )
}


/* ================================================================
   TABLET ITEM
================================================================ */

function EducationTabletItem({ item, darkMode, align }) {
    return (
        <div
            className={`
                relative
                flex
                flex-col
                items-center
                text-center
                ${
                align === 'left'
                    ? 'md:items-center'
                    : ''
            }
            `}
        >

            {/* YEAR */}

            <div
                className={`
                    mb-2
                    text-[13px]
                    font-bold
                    ${
                    darkMode
                        ? 'text-cyan-300'
                        : 'text-indigo-600'
                }
                `}
            >
                {item.year}
            </div>


            {/* IMAGE */}

            <div
                className={`
                    h-[110px]
                    w-[110px]
                    overflow-hidden
                    rounded-full
                    border-[3px]
                    p-[3px]
                    shadow-lg
                    ${
                    darkMode
                        ? 'border-cyan-300/60 shadow-cyan-500/10'
                        : 'border-white shadow-indigo-300/40'
                }
                `}
            >
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full rounded-full object-cover"
                />
            </div>


            {/* NAME */}

            <h3
                className={`
                    mt-3
                    max-w-[180px]
                    text-[13px]
                    font-extrabold
                    leading-4
                    ${
                    darkMode
                        ? 'text-slate-100'
                        : 'text-[#172554]'
                }
                `}
            >
                {item.name}
            </h3>


            {/* LOCATION */}

            <p
                className={`
                    mt-1
                    max-w-[180px]
                    text-[11px]
                    leading-4
                    ${
                    darkMode
                        ? 'text-slate-400'
                        : 'text-slate-500'
                }
                `}
            >
                {item.location}
            </p>

        </div>
    )
}


/* ================================================================
   MOBILE ITEM
================================================================ */

function EducationMobileItem({ item, index, darkMode }) {
    return (
        <div className="relative flex min-h-[82px] items-start">

            {/* NODE */}

            <div
                className={`
                    relative
                    z-20
                    mt-3
                    flex
                    h-[12px]
                    w-[12px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${
                    darkMode
                        ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]'
                        : 'bg-indigo-500 shadow-[0_0_12px_rgba(79,70,229,0.35)]'
                }
                `}
            >
                <div className="h-[4px] w-[4px] rounded-full bg-white" />
            </div>


            {/* CONTENT */}

            <div className="ml-5 flex min-w-0 flex-1 items-center gap-4">

                {/* IMAGE */}

                <div
                    className={`
                        h-[66px]
                        w-[66px]
                        shrink-0
                        overflow-hidden
                        rounded-full
                        border-2
                        p-[2px]
                        ${
                        darkMode
                            ? 'border-cyan-300/60'
                            : 'border-white shadow-md'
                    }
                    `}
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>


                {/* TEXT */}

                <div className="min-w-0">

                    <div
                        className={`
                            mb-1
                            text-[10px]
                            font-bold
                            ${
                            index % 2 === 0
                                ? darkMode
                                    ? 'text-cyan-300'
                                    : 'text-blue-600'
                                : darkMode
                                    ? 'text-violet-300'
                                    : 'text-violet-600'
                        }
                        `}
                    >
                        {item.year}
                    </div>


                    <h3
                        className={`
                            m-0
                            text-[12px]
                            font-extrabold
                            leading-4
                            ${
                            darkMode
                                ? 'text-slate-100'
                                : 'text-[#172554]'
                        }
                        `}
                    >
                        {item.name}
                    </h3>


                    <p
                        className={`
                            mt-0.5
                            text-[10px]
                            leading-4
                            ${
                            darkMode
                                ? 'text-slate-400'
                                : 'text-slate-500'
                        }
                        `}
                    >
                        {item.location}
                    </p>

                </div>

            </div>

        </div>
    )
}


export default Education