import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import ModalApp from "../modal/ModalApp";
import ModalSuccess from "../modal/ModalSuccess";
import PopoverApp from "../icon/PopoverApp";

export default function NarBav() {
  return (
    <Navbar className="border-b-1">
      <NavbarBrand>
        <Link to="/">
          <p className="text-4xl font-extrabold text-transparent  hover:from-red-400 hover:to-red-600 bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
             Home
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent className=" gap-4  " justify="end">
        <NavbarItem className="flex flex-row  ">
           <div className="flex justify-end px-4">
        <Link to="/about">
            <p className="text-blue-400 font-serif hover:text-gray-400 font-extrabold">
              About{" "}
            </p>
        </Link>
      </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className=" gap-4  " justify="end">
        <NavbarItem className="flex flex-row ">
          <ModalApp titleModal={"CREATE FORM"} textBtn={"Create Product"} />
          <PopoverApp />
        </NavbarItem>
      </NavbarContent>
      <ModalSuccess />
    </Navbar>
  );
}
