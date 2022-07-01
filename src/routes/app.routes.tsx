import { Route, Routes } from "react-router-dom";
import { Categories } from "../pages/Categories/Categories";
import { Category } from "../pages/Categories/Category";
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
