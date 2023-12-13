import React from "react";
import { CartItem } from "../../model/InitStore";
import useStoreProduct from "../../store/ZustandStore";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

const FormCart = () => {
  const { cart, getQuantity, deleteToCart, getTotalQuantity, getTotalPrice } =
    useStoreProduct();
  const handleDeleteToCart = (id: number) => {
    deleteToCart(id);
  };
  return (
    <div>
      <div>
        {cart?.map((item: CartItem, index: number) => (
          <div key={index}>
            <div className="grid grid-col-4 grid-flow-col gap-4">
              <div>
                <img
                  className="object-cover border-1 h-[30px] w-[40px] rounded-lg  "
                  src={item.product.thumbnail}
                  alt="product"
                />
              </div>
              <div>
                <p className="text-red-500 font-bold">
                  {getQuantity(item.product.id)}
                </p>
              </div>
              <div className="flex flex-col justify-end text-black w-[200px] text-end  font-bold ">
                {item?.product.title}
                <div className="text-blue-500 ">${item?.product.price}</div>
              </div>
              <div className="flex justify-end">
                <Button
                  isIconOnly
                  variant="light"
                  onClick={() => handleDeleteToCart(item.product.id)}
                >
                  <Image
                    width={20}
                    alt="NextUI hero Image"
                    src="/image/red-trash-can-icon.svg"
                  />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="font-bold ">Total = {getTotalQuantity()}</div>
        <div className="font-bold">
          TotalPrice ={" "}
          <span className="text-green-500">${getTotalPrice()}</span>
        </div>
      </div>
    </div>
  );
};

export default FormCart;
