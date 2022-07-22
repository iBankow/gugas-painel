import { Route, Routes } from "react-router-dom";
import { Categories } from "../pages/Categories/Categories";
import { Category } from "../pages/Categories/Category";
import { Menu } from "../pages/Menu/Menu";
import { Order } from "../pages/Orders/Order";
import { Orders } from "../pages/Orders/Orders";
import { Method } from "../pages/PaymentMethods/Method";
import { Methods } from "../pages/PaymentMethods/Methods";
import { Product } from "../pages/Products/Product";
import { Products } from "../pages/Products/Products";
import { Layout } from "./layout.routes";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/product" element={<Product />} />
        <Route path="/products/product/:productId" element={<Product />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/category" element={<Category />} />
        <Route path="/categories/category/:categoryId" element={<Category />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/order" element={<Order />} />
        <Route path="/methods" element={<Methods />} />
        <Route path="/methods/method" element={<Method />} />
        <Route path="/menu" element={<Menu />} />
      </Route>
    </Routes>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
