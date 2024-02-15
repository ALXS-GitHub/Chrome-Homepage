import logo from "./logo.svg";
import "./App.css";
import { Home, YouTube, GlobalSettings, GitHub } from "./pages";

import { Background } from "./components";
import { Cursor } from "./utils";

import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

// Create a context
export const LinksContext = createContext();
export const BackgroundContext = createContext();

function App() {

    const [links, setLinks] = useState([]);
    const [background, setBackground] = useState([]);

    return (
        <HashRouter>
            <LinksContext.Provider value={{ links, setLinks }}>
                <BackgroundContext.Provider value={{ background, setBackground }}>
                    <Cursor />
                    <Background />
                    <GlobalSettings />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/YouTube" element={<YouTube />} />
                        <Route path="GitHub" element={<GitHub />} />
                    </Routes>
                </BackgroundContext.Provider>
            </LinksContext.Provider>
        </HashRouter>
    );
}

export default App;
