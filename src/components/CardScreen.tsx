import React from "react";
import RatingCard from "./RatingCard";
import { CardAppProps, InitProducts } from "../model/InitProducts";
import { Button } from "@nextui-org/react";
import useItemStore from "../store/ZustandStore";
import ModalApp from "./ModalApp";

const CardScreen = ({ data }: { data: CardAppProps }) => {
  const addItem = useItemStore(
    (state: { addItem: () => void }) => state.addItem,
  );

  return (
    <div className="mt-4 mx-2  gap-4 gap-y-8 grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {data?.products?.map((item: InitProducts) => (
        <div
          key={item.id}
          className=" grid max-w-xs bg-white rounded-2xl shadow-lg  transition duration-300 ease-in-out hover:scale-110 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="pb-2 rounded-lg  overflow-visible ">
            <img
              className="object-cover h-48 w-full rounded-lg  "
              src={item?.images[0]}
              alt="product"
            />
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
                onClick={addItem}
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
