import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout.tsx";
import Main from "./pages/Main.tsx";
import Favourites from "./pages/Favourites.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="favourites" element={<Favourites />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
