import { Routes, Route, Outlet, Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import Home from "./app/Home";
import NotFound from "./app/NotFound";
import { useCallback, useEffect, useState } from "react";
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
