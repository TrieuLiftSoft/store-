import {Link } from "react-router-dom";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  
} from "@nextui-org/react";
import ButtonApp from "./ButtonApp";

export default function NarBav() {
  
  return (

    <Navbar className="border-b-1">
      <NavbarContent className=" gap-4  " data-justify="center">
        <NavbarItem>
          <Link to="/">Home</Link>
        </NavbarItem>
      </NavbarContent>
      <ButtonApp title={'Create'} />
    </Navbar>
  );
}
