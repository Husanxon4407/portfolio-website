function Background({ darkMode }) {
    return (
        <div
            className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-500 ${
                darkMode
                    ? 'bg-[#08131f]'
                    : 'bg-[#dff1ff]'
            }`}
        >
            {/* Large soft shapes */}

            <div
                className={`absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl ${
                    darkMode
                        ? 'bg-cyan-900/20'
                        : 'bg-white/50'
                }`}
            />

            <div
                className={`absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full blur-3xl ${
                    darkMode
                        ? 'bg-cyan-800/15'
                        : 'bg-sky-200/40'
                }`}
            />

            <div
                className={`absolute bottom-[-10rem] left-1/3 h-[30rem] w-[30rem] rounded-full blur-3xl ${
                    darkMode
                        ? 'bg-blue-900/20'
                        : 'bg-blue-200/30'
                }`}
            />

            {/* Network lines */}

            <svg
                className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                    darkMode
                        ? 'opacity-70'
                        : 'opacity-70'
                }`}
                viewBox="0 0 1440 900"
                preserveAspectRatio="none"
            >
                <path
                    d="M-100 180 L250 80 L520 250 L820 100 L1120 260 L1540 120"
                    fill="none"
                    stroke={darkMode ? '#0f8f8f' : 'white'}
                    strokeWidth="1"
                />

                <path
                    d="M-100 650 L220 500 L500 700 L780 480 L1050 650 L1540 450"
                    fill="none"
                    stroke={darkMode ? '#0f8f8f' : 'white'}
                    strokeWidth="1"
                />

                <path
                    d="M250 80 L220 500"
                    fill="none"
                    stroke={darkMode ? '#0f8f8f' : 'white'}
                    strokeWidth="1"
                />

                <path
                    d="M520 250 L500 700"
                    fill="none"
                    stroke={darkMode ? '#0f8f8f' : 'white'}
                    strokeWidth="1"
                />

                <path
                    d="M820 100 L780 480"
                    fill="none"
                    stroke={darkMode ? '#0f8f8f' : 'white'}
                    strokeWidth="1"
                />

                <path
                    d="M1120 260 L1050 650"
                    fill="none"
                    stroke={darkMode ? '#0f8f8f' : 'white'}
                    strokeWidth="1"
                />

                {/* Nodes */}

                <circle cx="250" cy="80" r="4" fill={darkMode ? '#22c1c3' : 'white'} />
                <circle cx="520" cy="250" r="4" fill={darkMode ? '#22c1c3' : 'white'} />
                <circle cx="820" cy="100" r="4" fill={darkMode ? '#22c1c3' : 'white'} />
                <circle cx="1120" cy="260" r="4" fill={darkMode ? '#22c1c3' : 'white'} />

                <circle cx="220" cy="500" r="4" fill={darkMode ? '#22c1c3' : 'white'} />
                <circle cx="500" cy="700" r="4" fill={darkMode ? '#22c1c3' : 'white'} />
                <circle cx="780" cy="480" r="4" fill={darkMode ? '#22c1c3' : 'white'} />
                <circle cx="1050" cy="650" r="4" fill={darkMode ? '#22c1c3' : 'white'} />
            </svg>
        </div>
    )
}

export default Background