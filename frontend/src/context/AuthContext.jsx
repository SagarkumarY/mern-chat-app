import { createContext, useState,useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [authuser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)
    return (
        <AuthContext.Provider value={{ authuser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to consume the AuthContext
export const useAuthContext = () => useContext(AuthContext);


