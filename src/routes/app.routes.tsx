import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login/Login";
import { Menu } from "../pages/Menu/Menu";
import {
  Categories,
  Category,
  Home,
  Method,
  Methods,
  Order,
  Orders,
  Product,
  Products,
} from "../pages";

import { Layout } from "./layout.routes";
import { AuthRoute } from "./auth.routes";
import { NoMatch } from "./nomatch.routes";

const AppRoutes = () => {
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
            <Route path=":orderId" element={<Order />} />
          </Route>
        </Route>
      </Route>
      <Route path="menu" element={<Menu />}>
        <Route index />
        <Route path=":categorySlug" />
      </Route>
      <Route path="*" element={<NoMatch to='/login' />} />
    </Routes>
  );
};

export { AppRoutes };