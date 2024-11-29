import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = ({ isAuthenticated }) => {
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
