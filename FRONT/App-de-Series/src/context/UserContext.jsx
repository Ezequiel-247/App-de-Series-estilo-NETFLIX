import { createContext, useState, useEffect } from "react";

// Creamos el contexto
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Inicializamos el estado desde localStorage
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Sincronizamos localStorage cada vez que cambia el usuario
    useEffect(() => {
        if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        } else {
        localStorage.removeItem("user");
        }
    }, [user]);

    // Función para iniciar sesión
    const login = (userData) => {
        setUser(userData);
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
        {children}
        </UserContext.Provider>
    );
};
