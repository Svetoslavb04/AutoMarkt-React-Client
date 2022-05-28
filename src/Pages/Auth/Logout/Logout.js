import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext';

import * as authService from "../../../services/authService";

export default function Logout() {

    const { user, logout } = useAuthContext();

    let navigate = useNavigate();

    if (user.isAuthenticated) {
        
        authService.logout()
            .then(() => {
                logout();
                navigate('/', { replace: true });
            })
            .catch(() => {
                logout();
                navigate('/', { replace: true });
            });

    } else {

        logout();

    }
}