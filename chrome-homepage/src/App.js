import logo from "./logo.svg";
import "./App.css";
import { Home } from "./pages";

import React from "react";
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
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BackgroundContext.Provider>
            </LinksContext.Provider>
        </HashRouter>
    );
}

export default App;
