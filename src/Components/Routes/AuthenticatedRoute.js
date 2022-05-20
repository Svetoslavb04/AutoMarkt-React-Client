import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthenticatedRoute(props) {
    
    const { user } = useAuthContext();
    
    if (!user.isAuthenticated) {
        
        return <Navigate to='/login' replace />;

    }

    return (
        props.children
    );
}