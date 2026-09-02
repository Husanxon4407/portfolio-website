import Background from "./components/Background/Background.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
    return (
        <>
            <Background />
            <Navbar />
            <main className="pt-[60px]">
                <section
                    id="home"
                    className="min-h-screen"
                >
                    Portfolio
                </section>
            </main>
        </>
    )
}

export default App