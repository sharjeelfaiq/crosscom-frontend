import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
