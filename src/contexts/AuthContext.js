import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";
import jwt_decode from "jwt-decode";

const initialUser = {
    _id: null,
    username: null,
    xToken: null
};

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [user, setUser] = useState(initialUser);
    const [isUserStateSettled, setIsUserStateSettled] = useState(false);

    useEffect(() => {
        authService.refreshToken()
            .then(({xToken}) => {
                var user = jwt_decode(xToken);

                setUser({ _id: user._id, username: user.username, xToken });
                setIsUserStateSettled(true);

            })
            .catch((err) => {

                setUser(initialUser);
                setIsUserStateSettled(true);

            })
    }, [])

    const login = (user) => setUser({ _id: user._id, username: user.username, xToken: user.xToken });

    const logout = () => setUser(initialUser);

    return (
        isUserStateSettled
            ? (
                <AuthContext.Provider value={{ user, login, logout }}>
                    {props.children}
                </AuthContext.Provider>
            )
            : <></>
    )
}

export const useAuthContext = () => useContext(AuthContext);