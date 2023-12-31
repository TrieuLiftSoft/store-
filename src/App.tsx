import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./app/Home";
import NotFound from "./app/NotFound";
import ProductsScreen from "./app/ProductsScreen";
import About from "./app/About";
import NarBav from "./components/layout/Navbar";

export default function App() {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const path = currentPath?.[1];
  return (
    <div>
      {path === "about" ? null : <NarBav />}
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="page/:pageNumber" element={<ProductsScreen />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
