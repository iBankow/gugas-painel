import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Login } from "../pages/Login/Login";
import { Product } from "../pages/Products/Product";
import { Products } from "../pages/Products/Products";
import { Layout } from "./layout.routes";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path="new-product" element={<Product />} />
            <Route path=":productId" element={<Product />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export { Navigation };

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
