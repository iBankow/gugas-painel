// import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import { useAuth } from "../contexts/authContext";
import { Login } from "../pages/Login/Login";
import { Menu } from "../pages/Menu/Menu";

const Auth = () => {
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/:categorySlug" element={<Menu />} />
      <Route index element={<Login />} />
    </Routes>
  );
};

export { Auth };
