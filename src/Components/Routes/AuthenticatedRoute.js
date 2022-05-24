import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

import { useNotificationContext, types } from '../../contexts/NotificationContext'

export default function AuthenticatedRoute(props) {

    const { user } = useAuthContext();

    const { popNotification } = useNotificationContext();

    if (!user.isAuthenticated) {

        setTimeout(() => {

            popNotification('Please login!', types.error);

        }, 400);

        return <Navigate to='/login' replace />;

    }

    return (
        props.children
    );
}