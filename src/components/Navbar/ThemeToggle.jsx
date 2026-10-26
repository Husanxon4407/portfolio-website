function ThemeToggle({ darkMode, setDarkMode, compact = false }) {
    return (
        <button
            type="button"
            aria-label="Toggle dark mode"
            aria-pressed={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center justify-center rounded-full border-none text-lg transition-all duration-300 ${
                compact
                    ? 'h-[44px] w-[44px]'
                    : 'h-[46px] w-[46px]'
            } ${
                darkMode
                    ? 'bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                    : 'bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/15'
            }`}
        >
            {darkMode ? (
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="4"
                        fill="currentColor"
                    />
                    <path
                        d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            ) : (
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M21 12.8A8.5 8.5 0 1 1 11.2 3A6.7 6.7 0 0 0 21 12.8Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </button>
    )
}

export default ThemeToggle
