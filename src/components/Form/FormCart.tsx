import React from "react";
import { CartItem } from "../../model/InitStore";
import useStoreProduct from "../../store/ZustandStore";
import { Button } from "@nextui-org/react";
import { InitProducts } from "../../model/InitProducts";

const FormCart = () => {
  const {
    cart,
    getQuantity,
    addToCart,
    deleteToCart,
    getTotalQuantity,
    getTotalPrice,
  } = useStoreProduct();
  const handleAddToCart = (item: InitProducts) => {
    addToCart(item, 1);
  };
  const handleDeleteToCart = (id: number) => {
    deleteToCart(id);
  };
  return (
    <div>
      <div>
        {cart?.map((item: CartItem, index: number) => (
          <div key={index}>
            <div className="grid grid-col-3 grid-flow-col gap-4">
              <div>
                <img
                  className="object-cover border-1 h-[30px] w-[40px] rounded-lg  "
                  src={item.product.thumbnail}
                  alt="product"
                />
              </div>
              <div>
                <Button
                  isIconOnly
                  variant="light"
                  onClick={() => handleDeleteToCart(item.product.id)}
                >
                  -
                </Button>
                <span className="text-red-500 font-bold">
                  {getQuantity(item.product.id)}
                </span>
                <Button
                  isIconOnly
                  variant="light"
                  onClick={() => handleAddToCart(item.product)}
                >
                  +
                </Button>
              </div>
              <div className=" text-black w-[200px] text-end  font-bold ">
                {item?.product.title}
                <div className="text-blue-500 ">${item?.product.price}</div>
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
