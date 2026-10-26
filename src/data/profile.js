export const contacts = {
    email: 'husanxonbahodirxonov@gmail.com',
    phone: '+998 93 006 44 07',
    phoneHref: 'tel:+998930064407',
    telegram: '@bh_s_t',
    telegramHref: 'https://t.me/bh_s_t',
}

export const socialLinks = [
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
        href: `mailto:${contacts.email}`,
    },
]

export const stats = [
    { id: 'students', value: 500, suffix: '+' },
    { id: 'ielts', value: 200, prefix: '~' },
    { id: 'score', value: 7.5, decimals: 1 },
    { id: 'community', value: 4, suffix: '+' },
    { id: 'certificates', value: 10, suffix: '+' },
]

// Order matters: shown top to bottom, newest first
export const experience = [
    { id: 'hardwork', type: 'work' },
    { id: 'itCommunity', type: 'volunteer', current: true },
    { id: 'marathon', type: 'volunteer' },
    { id: 'roadshow', type: 'volunteer' },
    { id: 'plugAndPlay', type: 'volunteer' },
    { id: 'uEnter', type: 'volunteer' },
]

export const projects = [
    {
        id: 'portfolio',
        title: 'Portfolio Website',
        icon: '</>',
        stack: ['React', 'Vite', 'Tailwind CSS', 'GitHub Actions'],
        codeUrl: 'https://github.com/Husanxon4407/portfolio-website',
        liveUrl: 'https://husanxon4407.github.io/portfolio-website/',
    },
    {
        id: 'uzchess',
        title: 'UzChess',
        icon: '♞',
        stack: ['Next.js', 'React', 'Figma'],
    },
]

export const githubProfile = 'https://github.com/Husanxon4407'

export const skillGroups = [
    { id: 'programming', items: ['JavaScript', 'TypeScript', 'Python', 'Java'] },
    { id: 'frontend', items: ['React', 'Next.js', 'React Native', 'HTML5', 'CSS3', 'Tailwind CSS'] },
    { id: 'backend', items: ['Node.js', 'NestJS', 'REST APIs'] },
    { id: 'database', items: ['PostgreSQL', 'SQL'] },
    { id: 'tools', items: ['Git', 'GitHub', 'Vite', 'WebStorm', 'PyCharm'] },
    { id: 'productivity', items: ['Microsoft Excel', 'Microsoft Word', 'Google Sheets'] },
    { id: 'data', items: ['Python', 'Data Science'], learning: true },
]

// CEFR level → 1..6; native speakers get a full bar
export const spokenLanguages = [
    { id: 'tajik', level: 'native', score: 6 },
    { id: 'uzbek', level: 'C1', score: 5 },
    { id: 'english', level: 'C1', score: 5 },
    { id: 'german', level: 'B1', score: 3 },
    { id: 'russian', level: 'A2', score: 2 },
]
