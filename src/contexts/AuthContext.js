import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const initialUser = {
    _id: null,
    username: null,
    isAuthenticated: false
};

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [user, setUser] = useState(initialUser);
    const [isUserStateSettled, setIsUserStateSettled] = useState(false);

    useEffect(() => {
        authService.authStatus()
            .then(user => {

                if (!user) {

                    setIsUserStateSettled(true);

                    return setUser(initialUser);

                }

                setUser({ _id: user.user._id, username: user.user.username, isAuthenticated: true });

                setIsUserStateSettled(true);
                
            });
    }, [])

    const login = (user) => setUser({ _id: user._id, username: user.username, isAuthenticated: true });

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