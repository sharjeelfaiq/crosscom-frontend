import React, { createContext, useContext, useState } from "react";

import AuthApis from "../providers/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => !!localStorage.getItem("token")
    );
    const { signin, signup } = AuthApis;

    const login = (userData) => {
        setIsAuthenticated(true);
        return signin(userData);
    };
    const register = (userData) => {
        setIsAuthenticated(true);
        return signup(userData);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                login,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);