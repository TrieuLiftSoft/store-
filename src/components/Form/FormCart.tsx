import React from "react";
import { Button, Image } from "@nextui-org/react";
import { ICartItem } from "../../model/InitStore";
import { useInitActions, storeProduct } from "../../store/ZustandStore";

const FormCart = () => {
  const { getQuantity, deleteToCart, getTotalPrice } = useInitActions();
  const { cart } = storeProduct();
  const handleDeleteToCart = (id: number) => {
    deleteToCart(id);
  };

  return (
    <div>
      <div>
        {cart?.map((item: ICartItem, index: number) => (
          <div key={index}>
            <div className="grid grid-col-4 border-b-2  grid-flow-col gap-4">
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
                    width={22}
                    alt="NextUI hero Image"
                    src="/image/red-trash-can-icon.svg"
                  />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="font-bold text-xl m-1">
          Total Price ={" "}
          <span className="text-green-500">💵{getTotalPrice()}</span>
        </div>
      </div>
    </div>
  );
};

export default FormCart;
