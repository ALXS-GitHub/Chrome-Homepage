import logo from "./logo.svg";
import "./App.css";
import { Home, YouTube, GlobalSettings } from "./pages";


import { Background } from "./components";

import React, { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

// Create a context
export const LinksContext = createContext();
export const BackgroundContext = createContext();

function App() {

    const [links, setLinks] = useState([]);
    const [background, setBackground] = useState([]);

    useEffect(() => {
        // Load the YouTube Player API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        console.log("YouTube Player API loaded");
    }, []);

    return (
        <HashRouter>
            <LinksContext.Provider value={{ links, setLinks }}>
                <BackgroundContext.Provider
                    value={{ background, setBackground }}
                >
                    <Background />
                    <GlobalSettings />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/YouTube" element={<YouTube />} />
                    </Routes>
                </BackgroundContext.Provider>
            </LinksContext.Provider>
        </HashRouter>
    );
}

export default App;
