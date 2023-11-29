import logo from "./logo.svg";
import "./App.css";
import { Home } from "./pages"

import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </HashRouter>
    )
}

export default App;
