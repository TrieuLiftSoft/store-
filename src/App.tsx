import { Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import NotFound from "./app/NotFound";
import NarBav from "./components/Navbar";

export default function App() {
  return (
    <div>
      <NarBav />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
