import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Categories } from "../pages/Categories/Categories";
import { Category } from "../pages/Categories/Category";
import { Login } from "../pages/Login/Login";
import { Menu } from "../pages/Menu/Menu";
import { Order } from "../pages/Orders/Order";
import { Orders } from "../pages/Orders/Orders";
import { Method } from "../pages/PaymentMethods/Method";
import { Methods } from "../pages/PaymentMethods/Methods";
import { Product } from "../pages/Products/Product";
import { Products } from "../pages/Products/Products";
import { Layout } from "./layout.routes";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AuthRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path="new-product" element={<Product />} />
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/categories">
            <Route index element={<Categories />} />
            <Route path="new-category" element={<Category />} />
            <Route path=":categoryId" element={<Category />} />
          </Route>
          <Route path="/methods">
            <Route index element={<Methods />} />
            <Route path="new-method" element={<Method />} />
            <Route path=":methodId" element={<Method />} />
          </Route>
          <Route path="/orders">
            <Route index element={<Orders />} />
            <Route path="order" element={<Order />} />
          </Route>
        </Route>
      </Route>
      <Route path="menu">
        <Route index element={<Menu />} />
        <Route path=":categorySlug" element={<Menu />} />
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

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
