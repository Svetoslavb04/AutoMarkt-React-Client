import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext';
import * as authService from "../../services/authService";

export default function Logout() {

    const { logout } = useAuthContext();
    
    let navigate = useNavigate();

    authService.logout()
        .then(() => {
            logout();
            navigate('/', { replace: true });
        })
        .catch(() => {
            logout();
            navigate('/', { replace: true });
        });
}