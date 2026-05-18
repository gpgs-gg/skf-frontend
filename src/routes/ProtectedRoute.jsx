import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRole }) => {
  const { loading, isAuthenticated, user } = useAuth();

  // auth loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // role check
  if (
    allowedRole &&
    user?.role?.toLowerCase() !==
      allowedRole?.toLowerCase()
  ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;