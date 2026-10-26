import {lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore} from "react";
import Background from "./components/Background/Background.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from './components/Footer/Footer.jsx';
import Hero from './components/Hero/Hero.jsx';
import Education from "./components/Education/Education.jsx";
import Stats from './components/Stats/Stats.jsx';
import About from './components/About/About.jsx';
import Experience from './components/Experience/Experience.jsx';
import Projects from './components/Projects/Projects.jsx';
import Skills from './components/Skills/Skills.jsx';
import Contact from './components/Contact/Contact.jsx';
import Certificates from './components/Certificates/Certificates.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import {useCollection} from './hooks/useCollection.js';

// Admin code (and the Supabase client) loads only when #/admin is opened
const Admin = lazy(() => import('./admin/Admin.jsx'));

const ADMIN_HASH = '#/admin'

const subscribeToHash = (callback) => {
    window.addEventListener('hashchange', callback)
    return () => window.removeEventListener('hashchange', callback)
}

const isAdminRoute = () => window.location.hash === ADMIN_HASH

const LANGUAGES = ['EN', 'UZ', 'RU']

// localStorage can throw in private mode or when storage is blocked
const readStorage = (key) => {
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}

const writeStorage = (key, value) => {
    try {
        localStorage.setItem(key, value)
    } catch {
        // Ignore — preference just won't persist
    }
}

const getInitialDarkMode = () => {
    const saved = readStorage('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

const getInitialLanguage = () => {
    const saved = readStorage('language')
    if (LANGUAGES.includes(saved)) return saved
    const browser = navigator.language?.slice(0, 2).toUpperCase()
    return LANGUAGES.includes(browser) ? browser : 'EN'
}

function App() {
    const [darkMode, setDarkMode] = useState(getInitialDarkMode);
    const [language, setLanguage] = useState(getInitialLanguage);
    const isAdmin = useSyncExternalStore(subscribeToHash, isAdminRoute);

    // Reload content when coming back from the admin page, so new uploads show up
    const certificates = useCollection('certificates', isAdmin);
    const gallery = useCollection('gallery', isAdmin);
    const projects = useCollection('projects', isAdmin);

    // Photos without an album (uploaded before albums existed) stay off the site
    const galleryPhotos = gallery.items.filter((item) => item.category);

    // Sections managed in the admin panel appear only once they have content
    const hiddenSections = [
        certificates.items.length === 0 && 'certificates',
        galleryPhotos.length === 0 && 'gallery',
    ].filter(Boolean);

    useEffect(() => {
        writeStorage('theme', darkMode ? 'dark' : 'light')
        document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
    }, [darkMode])

    // Switching between the site and the admin page swaps the whole page,
    // so jump to the requested section (or the top) once it has rendered
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }

        const target = isAdmin ? null : document.getElementById(window.location.hash.slice(1))
        if (target) target.scrollIntoView()
        else window.scrollTo(0, 0)
    }, [isAdmin])

    // Certificates and Gallery render only after their data arrives,
    // so links like #gallery need to scroll once the section exists
    const scrolledToHash = useRef(null)
    const loadedCounts = `${certificates.items.length}-${galleryPhotos.length}`

    useEffect(() => {
        const hash = window.location.hash
        if (isAdmin || scrolledToHash.current === hash) return
        if (!['#certificates', '#gallery'].includes(hash)) return

        const target = document.getElementById(hash.slice(1))
        if (target) {
            scrolledToHash.current = hash
            target.scrollIntoView()
        }
    }, [isAdmin, loadedCounts])

    useEffect(() => {
        writeStorage('language', language)
        document.documentElement.lang = language.toLowerCase()
    }, [language])

    return (
        <>
            <Background darkMode={darkMode}/>
            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                language={language}
                setLanguage={setLanguage}
                hiddenSections={hiddenSections}
                showLinks={!isAdmin}
            />
            {isAdmin ? (
                <div className="pt-[60px]">
                    <Suspense fallback={null}>
                        <Admin darkMode={darkMode}/>
                    </Suspense>
                </div>
            ) : (
                <>
                    <main className="pt-[60px]">
                        <Hero
                            darkMode={darkMode}
                            language={language}
                        />

                        <Stats darkMode={darkMode} language={language}/>
                        <About darkMode={darkMode} language={language}/>
                        <Experience darkMode={darkMode} language={language}/>
                        <Projects darkMode={darkMode} language={language} items={projects.items}/>
                        <Skills darkMode={darkMode} language={language}/>

                        <Education
                            darkMode={darkMode}
                            language={language}
                        />

                        {certificates.items.length > 0 && (
                            <Certificates darkMode={darkMode} language={language} items={certificates.items}/>
                        )}

                        {galleryPhotos.length > 0 && (
                            <Gallery darkMode={darkMode} language={language} items={galleryPhotos}/>
                        )}

                        <Contact darkMode={darkMode} language={language}/>
                    </main>
                    <Footer
                        darkMode={darkMode}
                        language={language}
                    />
                </>
            )}
        </>
    )
}

export default App
