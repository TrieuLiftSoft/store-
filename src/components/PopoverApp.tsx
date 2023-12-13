import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Badge,
  Button,
} from "@nextui-org/react";
import { CartIcon } from "./CartIcon";
import useStoreProduct from "../store/ZustandStore";

import FormCart from "./form/FormCart";
const PopoverApp = () => {
  const { getTotalQuantity } = useStoreProduct();
  return (
    <Popover placement="bottom-end">
      <Badge
        color="danger"
        content={getTotalQuantity()}
        isInvisible={false}
        shape="circle"
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            className="ml-4"
            size="lg"
            color="primary"
            variant="ghost"
          >
            <CartIcon size={50} />
          </Button>
        </PopoverTrigger>
      </Badge>
      <PopoverContent className="p-4 ">
        <FormCart />
      </PopoverContent>
    </Popover>
  );
};
export default PopoverApp;
