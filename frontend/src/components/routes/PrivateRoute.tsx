import useAuthStore from "@/store/auth-store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoading, authUser } = useAuthStore();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-lg text-black animate-pulse font-semibold">
          Checking authentication...
        </h1>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
