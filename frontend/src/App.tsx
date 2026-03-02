import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Homepage from "./pages/Homepage";
import useAuthStore from "./store/auth-store";
import { useEffect } from "react";
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import PublicRoute from "./components/routes/PublicRoute";

const App = () => {
  const { fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
