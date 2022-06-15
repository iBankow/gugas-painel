import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Login } from "../pages/Login/Login";

const Auth = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  );
};

const Redirect = () => {
  return <Navigate to="/login" replace={false} />;
};

export { Auth };
