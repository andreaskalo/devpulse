import useAuth from "../hooks/useAuth.jsx";
import { Navigate } from "react-router-dom";

function PublicOnlyRoute({ children }) {
  const { currentUser, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <h1>Loading...</h1>;
  }
  if (currentUser) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return children;
}

export default PublicOnlyRoute;
