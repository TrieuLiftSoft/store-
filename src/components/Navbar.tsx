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
import { useCallback, useEffect, useState } from "react";

export default function NarBav() {
  const [isLoadingButton, setIsLoadingButton] = useState(true);
  const handleButtonAdd = () => {
    setIsLoadingButton(false);
    setTimeout(() => {
      setIsLoadingButton(true);
    }, 1000);
  };
  return (

    <Navbar className="">
      <NavbarContent className=" gap-4  " data-justify="center">
        <NavbarItem>
          <Link to="/">Home</Link>
        </NavbarItem>
      </NavbarContent>
      {isLoadingButton ? (
        <Button color="primary" variant="shadow" onClick={handleButtonAdd}>
          Add item
        </Button>
      ) : (
        <Button color="primary" variant="shadow" isLoading></Button>
      )}
    </Navbar>
  );
}
