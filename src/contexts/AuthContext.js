import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";
import jwt_decode from "jwt-decode";

const initialUser = {
    _id: null,
    username: null,
    accessToken: null
};

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        authService.refreshToken()
            .then(xToken => {
                var user = jwt_decode(xToken);

                setUser({ _id: user._id, username: user.username, xToken });
            })
    }, [])

    const login = (user) => setUser({ _id: user._id, username: user.username, accessToken: user.xToken });

    const logout = () => setUser(initialUser);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);