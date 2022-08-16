import React from "react";
import { HashRouter as Router } from "react-router-dom";

export const RouteProvider = ({ children }) => {
    return <Router>{children}</Router>;
};
