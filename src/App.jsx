import {useState} from "react";
import Background from "./components/Background/Background.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from './components/Footer/Footer.jsx';
import Hero from './components/Hero/Hero.jsx';
function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("EN");
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
            </main>
            <Footer
                darkMode={darkMode}
                language={language}
            />
        </>
    )
}

export default App