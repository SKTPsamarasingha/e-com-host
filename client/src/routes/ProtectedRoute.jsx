import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthProvider";

const ProtectedRoute = () => {
    const {user, loading} = useAuth();
    if (loading) return null;
    return user ? <Outlet/> : <Navigate to="/auth/login" replace/>;
};

export default ProtectedRoute