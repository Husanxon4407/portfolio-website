import {useState} from "react";
import Background from "./components/Background/Background.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from './components/Footer/Footer.jsx'
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
                <section
                    id="home"
                    className="min-h-screen"
                >
                    Portfolio
                </section>
            </main>
            <Footer
                darkMode={darkMode}
                language={language}
            />
        </>
    )
}

export default App