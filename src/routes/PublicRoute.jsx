import React from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@/features/auth/services/index";
import LoaderPage from "../components/common/LoaderPage";

const PublicRoute = ({ children }) => {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <LoaderPage />;
  }

  // If user already logged in
  if (data?.user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
