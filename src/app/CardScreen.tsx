import React from "react";
import RatingCard from "../components/RatingCard";
import { CardAppProps, InitProducts } from "../model/InitProducts";
import { Button } from "@nextui-org/react";
import ModalApp from "../components/modal/ModalApp";
import ModalDelete from "../components/modal/ModalDelete";
import useStoreProduct from "../store/ZustandStore";

const CardScreen = ({ data }: { data: CardAppProps }) => {
  const { addToCart } = useStoreProduct();

  const handleAddToCart = (item: InitProducts) => {
    addToCart(item, 1);
  };
  return (
    <div className="mt-8 mx-2  gap-4 gap-y-8 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {data?.products?.map((item: InitProducts) => (
        <div
          key={item.id}
          className=" relative  grid max-w-xs bg-white  rounded-2xl drop-shadow-2xl  transition duration-50 ease-in-out hover:scale-105 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="pb-2 rounded-lg  overflow-visible ">
            <img
              className="object-cover h-48 w-full rounded-lg  "
              src={item?.images[0]}
              alt="product"
            />
            <ModalDelete id={item.id} />
          </div>
          <div className="px-4 pb-3 flex flex-col justify-between">
            <div className="flex flex-col">
              <div>
                <div className="flex flex-row  justify-between">
                  {" "}
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item?.title}
                  </h5>{" "}
                  <ModalApp
                    itemId={item.id}
                    titleModal={"EDIT FORM"}
                    textBtn={"Edit"}
                  />
                </div>

                <p className="text-[14px]">
                  Brand : <span className="text-blue-500">{item?.brand}</span>
                </p>
                <p className="text-[14px]">Number: {item?.stock}</p>
              </div>

              <p className="text-gray-400">#{item?.category}</p>
              <p className=" text-[12px] ">{item?.description}</p>
              <RatingCard rating={item?.rating} />
            </div>
            <div className="flex flex-col items-center justify-between">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${item?.price}
              </span>
              <p className="text-red-500 text-[14px]">
                -%{item?.discountPercentage}
              </p>

              <Button
                className="w-full"
                color="primary"
                variant="shadow"
                onClick={() => handleAddToCart(item)}
              >
                ADD ITEM
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CardScreen;
