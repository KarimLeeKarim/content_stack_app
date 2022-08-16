import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home";
import { DetailedCardPage } from "../components/DetailedCardPage";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/"  >
                <Route path="/" element={<Navigate replace to="books" />} />
                <Route path="books" element={<Home />} />
            </Route>
            <Route path="/books"  >
                <Route path="*" element={<DetailedCardPage />} />
            </Route>
        </Routes>
    );
};
