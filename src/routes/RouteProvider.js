import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export const RouteProvider = ({ children }) => {
    return <Router>{children}</Router>;
};
