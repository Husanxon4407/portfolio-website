import {useEffect, useState} from "react";
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

    useEffect(() => {
        writeStorage('theme', darkMode ? 'dark' : 'light')
        document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
    }, [darkMode])

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
            />
            <main className="pt-[60px]">
               <Hero
                   darkMode={darkMode}
                   language={language}
               />

                <Stats darkMode={darkMode} language={language}/>
                <About darkMode={darkMode} language={language}/>
                <Experience darkMode={darkMode} language={language}/>
                <Projects darkMode={darkMode} language={language}/>
                <Skills darkMode={darkMode} language={language}/>

                <Education
                    darkMode={darkMode}
                    language={language}
                />

                <Contact darkMode={darkMode} language={language}/>
            </main>
            <Footer
                darkMode={darkMode}
                language={language}
            />
        </>
    )
}

export default App
