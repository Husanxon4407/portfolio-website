/*
 * What can be managed in the admin panel and which fields each item has.
 * Field types: text | textarea | date | url | tags
 */
export const collections = [
    {
        id: 'certificates',
        table: 'certificates',
        label: 'Certificates',
        singular: 'certificate',
        image: 'required',
        multiple: false,
        titleField: 'title',
        subtitleFields: ['issuer', 'issued_on'],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g. Volunteer of IT Community Roadshow' },
            { name: 'issuer', label: 'Issued by', type: 'text', placeholder: 'e.g. IT Community of Uzbekistan' },
            { name: 'issued_on', label: 'Date', type: 'date' },
        ],
    },
    {
        id: 'projects',
        table: 'projects',
        label: 'Projects',
        singular: 'project',
        image: 'optional',
        multiple: false,
        titleField: 'title',
        subtitleFields: ['stack'],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g. UzChess' },
            { name: 'description_en', label: 'Description (English)', type: 'textarea', required: true },
            { name: 'description_uz', label: 'Description (Uzbek)', type: 'textarea', placeholder: 'Leave empty to show the English text' },
            { name: 'description_ru', label: 'Description (Russian)', type: 'textarea', placeholder: 'Leave empty to show the English text' },
            { name: 'stack', label: 'Tech stack (comma separated)', type: 'tags', placeholder: 'React, Next.js, Tailwind CSS' },
            { name: 'code_url', label: 'GitHub link', type: 'url', placeholder: 'https://github.com/...' },
            { name: 'live_url', label: 'Live site link', type: 'url', placeholder: 'https://...' },
        ],
    },
    {
        id: 'gallery',
        table: 'gallery',
        label: 'Gallery',
        singular: 'photo',
        image: 'required',
        // Several photos picked at once upload straight away, like a Telegram album
        multiple: true,
        titleField: 'caption',
        subtitleFields: ['event', 'taken_on'],
        fields: [
            { name: 'caption', label: 'Caption', type: 'text', placeholder: 'e.g. Registration desk at Expo Day' },
            { name: 'event', label: 'Event', type: 'text', placeholder: 'e.g. Plug and Play TechFest' },
            { name: 'taken_on', label: 'Date', type: 'date' },
        ],
    },
]
