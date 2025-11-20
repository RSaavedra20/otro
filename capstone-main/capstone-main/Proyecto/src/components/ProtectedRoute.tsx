import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const ok = isAuthenticated();
  const location = useLocation();
  if (!ok) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}
