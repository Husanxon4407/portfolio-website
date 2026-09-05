function SocialIcon({ type }) {
    if (type === 'telegram') {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M21.4 3.5 2.9 10.7c-1.3.5-1.3 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.1.9.6.9.4 0 .6-.2.8-.4l2.3-2.2 4.8 3.5c.9.5 1.5.3 1.7-.8l3.1-15.7c.3-1.3-.5-1.9-1.1-1.6ZM8.1 13.4l10.8-6.8c.5-.3.9-.1.5.2l-8.8 7.9-.3 3.1-1.1-3.5-2.7-.9c-.6-.2-.6-.5.1-.8Z" />
            </svg>
        )
    }

    if (type === 'instagram') {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
            >
                <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
                <circle cx="12" cy="12" r="4" />
                <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                />
            </svg>
        )
    }

    if (type === 'linkedin') {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M5.2 8.2A2.2 2.2 0 1 0 5.2 3.8a2.2 2.2 0 0 0 0 4.4ZM3.3 20.2h3.8V9.8H3.3v10.4ZM9.3 9.8h3.7v1.4h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.7v5.2h-3.8v-4.6c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.7H9.3V9.8Z" />
            </svg>
        )
    }

    if (type === 'github') {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M12 2.2C6.48 2.2 2 6.68 2 12.2c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.01c.85 0 1.7.11 2.49.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.59 4.93.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10.01 10.01 0 0 0 22 12.2C22 6.68 17.52 2.2 12 2.2Z" />
            </svg>
        )
    }

    return (
        <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
        </svg>
    )
}

export default SocialIcon