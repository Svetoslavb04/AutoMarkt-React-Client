import { createContext, useState, useContext } from "react";

export const types = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning',
}

const initialState = {
    visible: false,
    message: '',
    type: ''
}

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [timeoutId, setTimeoutId] = useState();

    const [state, setState] = useState(initialState);

    const hideNotification = () => setState(state => { return { ...state, visible: false } });

    const popNotification = (message, type) => {

        clearTimeout(timeoutId);

        setState({
            visible: true,
            message,
            type
        });

        setTimeoutId(
            setTimeout(() => setState(state => { return { ...state, visible: false } }), 3000)
        );

    }

    return (
        <NotificationContext.Provider
            value={{ state, popNotification, hideNotification }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => useContext(NotificationContext);