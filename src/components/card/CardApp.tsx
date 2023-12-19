/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import RatingCard from "../icon/RatingCard";
import { IDataProducts, IProducts } from "../../model/InitProducts";
import ModalApp from "../modal/ModalApp";
import ModalDelete from "../modal/ModalDelete";
import { useInitActions } from "../../store/ZustandStore";

const CardScreen = ({ data }: { data?: IDataProducts }) => {
  const { addToCart } = useInitActions();
  const storedData = localStorage.getItem("DATA");
  const [listItem, setListItem] = useState<IProducts[]>([]);
  const [checkedState, setCheckedState] = useState(
    new Array(data?.products?.length).fill(false),
  );

  const handleAddToCart = (item: IProducts) => {
    addToCart(item, 1);
  };

  const handleAddProduct = (data: IProducts) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === data.id ? !item : item,
    );
    const checkID = listItem?.some((item) => item.id === data.id);
    if (listItem?.length === 0) {
      setListItem((listItem) => [...(listItem || []), data]);
    } else if (listItem?.length > 0 && checkID === false) {
      setListItem((listItem) => [...(listItem || []), data]);
    } else if (
      listItem !== undefined &&
      checkedState[data.id] &&
      checkID === true
    ) {
      const updateObj = listItem?.filter((item) => item.id !== data.id);
      localStorage.setItem("DATA", JSON.stringify(updateObj));
      setListItem(updateObj);
    }
    setCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && listItem?.length > 0) {
      localStorage.setItem("DATA", JSON.stringify(listItem));
    }
  }, [listItem]);

  useEffect(() => {
    if (storedData) {
      const listItemData = JSON.parse(storedData!);
      const arrayStateCheckBox = listItemData.map((obj: IProducts) => obj.id);
      arrayStateCheckBox.forEach((index: number) => {
        checkedState[index] = true;
      });
      setListItem(listItemData);
    }
  }, []);

  return (
    <div className="mt-8 mx-2  gap-8 gap-y-8 grid grid-cols-1  md:grid-cols-2  xl:grid-cols-3">
      {data?.products?.map((item: IProducts, index: number) => (
        <div
          key={index}
          className=" relative flex flex-row hover:bg-[#F3F8FF]  px-8 py-4 bg-white  rounded-xl drop-shadow-2xl  transition duration-50 ease-in-out hover:scale-105 dark:bg-gray-800 dark:border-gray-700"
        >
           <ModalDelete id={item.id} title={item?.title} />
          <div>
            <Checkbox
              isSelected={checkedState[item.id]}
              onChange={() => handleAddProduct(item)}
            />
            <div className="pb-2 rounded-lg  overflow-visible ">
              <img
                className="object-cover h-48 w-40 rounded-lg   "
                src={item?.images[0]}
                alt="product"
              />
            </div>

            <RatingCard rating={item?.rating} />
          </div>
          <div className=" truncate  px-4 pb-3 flex flex-col justify-between align-bottom ">
            <h5 className=" text-xl w-[200px] font-semibold tracking-tight text-gray-900 dark:text-white">
              {item?.title}
            </h5>{" "}
            <p className="text-[14px]">
              Brand : <span className="text-blue-500">{item?.brand}</span>
            </p>
            <p className="text-[14px]">Number: {item?.stock}</p>
            <p className="text-gray-400">#{item?.category}</p>
            <p className=" text-[12px] ">{item?.description}</p>
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              ${item?.price}
            </span>
            <p className="text-red-500  truncate h-[40px] text-[14px]">
              -%{item?.discountPercentage}
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-center  sm:justify-between  ">
              <ModalApp
                itemId={item.id}
                titleModal={"EDIT FORM"}
                textBtn={"Edit"}
              />
              <div>
                <Button
                  color="primary"
                  variant="shadow"
                  onClick={() => handleAddToCart(item)}
                >
                  ADD ITEM
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CardScreen;
