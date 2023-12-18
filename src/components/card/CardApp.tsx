/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import RatingCard from "../icon/RatingCard";
import { IDataProducts, IProducts } from "../../model/InitProducts";
import { Button, Checkbox } from "@nextui-org/react";
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
    /// set State  true or false to array
    const updatedCheckedState = checkedState.map((item, index) =>
      index === data.id ? !item : item,
    );
    // check id true
    const checkID = listItem?.some((item) => item.id === data.id);
    // check Obj  === []  -> add item to Obj
    if (listItem?.length === 0) {
      setListItem((listItem) => [...(listItem || []), data]);
    }
    //// check Obj length > 0  and item.id != data.id -> add item to Obj
    else if (listItem?.length > 0 && checkID === false) {
      setListItem((listItem) => [...(listItem || []), data]);
    }
    //// check Obj != undefined  and checkState === true and item.id === data.id
    ///->  create Obj not data.id , set localStorage , update count  length
    else if (
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
    <div className="mt-8 mx-2  gap-4 gap-y-8 grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 ">
      {data?.products?.map((item: IProducts) => (
        <div
          key={item.id}
          className=" relative flex flex-row  p-4 bg-white  rounded-2xl drop-shadow-2xl  transition duration-50 ease-in-out hover:scale-105 dark:bg-gray-800 dark:border-gray-700"
        >
          <div>
            <Checkbox
              isSelected={checkedState[item.id]}
              onChange={() => handleAddProduct(item)}
            />
            <div className="pb-2 rounded-lg  overflow-visible ">
              <img
                className="object-cover h-48 w-full rounded-lg  "
                src={item?.images[0]}
                alt="product"
              />
              <ModalDelete id={item.id} />
            </div>

            <RatingCard rating={item?.rating} />

          </div>
          <div className="px-4 pb-3 flex flex-col justify-between align-bottom ">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
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

              <div className="flex flex-row justify-between  ">
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
