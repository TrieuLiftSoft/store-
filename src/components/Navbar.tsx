import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import ModalApp from "./modal/ModalApp";
import ModalSuccess from "./modal/ModalSuccess";

export default function NarBav() {
  return (
    <Navbar className="border-b-1 ">
      <NavbarBrand>
        <Link to="/">
          <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
             Home
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent className=" gap-4  " justify="end">
        <NavbarItem className="flex flex-row ">
          <ModalApp titleModal={"CREATE FORM"} textBtn={"Create Product"} />
        </NavbarItem>
      </NavbarContent>
      <ModalSuccess />
    </Navbar>
  );
}
