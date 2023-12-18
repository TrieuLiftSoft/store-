import { Link } from "react-router-dom";
import {
  Badge,
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
          <p className="text-4xl font-extrabold text-transparent  hover:from-red-400 hover:to-red-600 bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
             Home
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent className=" gap-4  " justify="end">
        <NavbarItem className="flex flex-row  ">
          <Link to="/page/1">
            <p className="text-xl font-extrabold  hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 ">
              ⚙Products
            </p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className=" gap-4  " justify="end">
        <NavbarItem className="flex flex-row ">
          <ModalApp titleModal={"CREATE FORM"} textBtn={"Create Product"} />
        </NavbarItem>
      </NavbarContent>
      <ModalSuccess />
    </Navbar>
  );
}
