import { createContext, useState, useContext } from "react";

export const types = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning',
}

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);

    const hideNotification = (message) => setNotifications(notifications => notifications.filter(n => n.message != message));

    const popNotification = (message, type) => {

        const notificationIndex = notifications.findIndex(n => n.message == message);

        if (notificationIndex > -1) {
            clearTimeout(notifications[notificationIndex].timeoutId);

            const notification = notifications[notificationIndex];

            if (notification) {
                notification.timeoutId = setTimeout(() => {
                    setNotifications(notifications => notifications.filter(n => n.message != message));
                }, 3000);

                notifications.splice(notificationIndex, 1, notification);

                setNotifications([...notifications]);
            }

            return;
        }

        const notification = {
            message,
            type,
            timeoutId: setTimeout(() => {
                setNotifications(notifications => notifications.filter(n => n.message != message));
            }, 3000)
        }

        setNotifications(oldNotifications => [...oldNotifications, notification]);

    }

    return (
        <NotificationContext.Provider
            value={{
                popNotification, hideNotification,
                notifications, setNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => useContext(NotificationContext);