import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function OwnerRoute({ children }) {
  const { isAuthenticated, isOwner } = useAuth();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  if (!isOwner) return <Navigate to="/admin/home" replace />;

  return children;
}