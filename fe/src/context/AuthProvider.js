import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token,setToken] = useState(null);

    const login = (user,token)=>{
        setUser(user);
        setToken(token)
    }
    const logout = (user, token)=>{
        setUser(null);
        setToken(null);
    }
    return (
        <AuthContext.Provider value={{ user ,token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=>{
    return useContext(AuthContext);
}