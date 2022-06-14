import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";

const Index = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export { Index };
