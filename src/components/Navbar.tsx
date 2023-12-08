import { Link } from "react-router-dom";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import ModalApp from "./ModalApp";
import ModalSuccess from "./ModalSuccess";

export default function NarBav() {
  return (
    <Navbar className="border-b-1">
      <NavbarContent className=" gap-4  " data-justify="center">
        <NavbarItem>
          <Link to="/">
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
               Home
            </p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <ModalApp titleModal={"CREATE FORM"} textBtn={"Create Product"} />
      <ModalSuccess />
    </Navbar>
  );
}
