import logo from "./logo.svg";
import "./App.css";
import { Home } from "./pages";

import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

// Create a context
export const LinksContext = createContext();

function App() {

    const [links, setLinks] = useState([]);

    return (
        <HashRouter>
            <LinksContext.Provider value={{ links, setLinks }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </LinksContext.Provider>
        </HashRouter>
    );
}

export default App;
