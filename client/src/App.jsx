import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import Welcome from "./pages/Welcome/Welcome";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("token");
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={token ? <Home /> : <Auth />} />
      </Routes>
    </>
  );
}

export default App;
