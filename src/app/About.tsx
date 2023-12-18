import React, { useEffect, useState } from "react";
import { Badge, Button, Checkbox } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { IProducts } from "../model/InitProducts";

const About = () => {
  const [listItem, setListItem] = useState<IProducts[] | undefined>([]);
  const [numberNotification, setNumberNotification] = useState(0);
  const navigate = useNavigate();

  const handleCheckBox = (data: IProducts) => {
    if (data && listItem !== undefined) {
      const updateObj = listItem?.filter((item) => item !== data);
      setListItem(updateObj);
      localStorage.setItem("DATA", JSON.stringify(updateObj));
    }
  };

  const handleBack = () => {
    navigate("/page/1");
  };

  useEffect(() => {
    setNumberNotification(listItem?.length!);
  }, [listItem]);

  useEffect(() => {
    const storedData = localStorage.getItem("DATA");
    if (storedData) {
      const listItemData = JSON.parse(storedData!);
      setListItem(listItemData);
    }
  }, []);

  return (
    <div className="drop-shadow-xl">
      <div className="flex justify-between p-4">
        {" "}
        <Badge
          color="danger"
          content={numberNotification}
          isInvisible={false}
          shape="circle"
        >
          <p className="text-6xl font-serif hover:text-gray-400 font-extrabold">
            A
          </p>
        </Badge>
        <Button size="lg" onClick={handleBack}>
          {" "}
          ⬅️ Back
        </Button>
      </div>

      {listItem?.length === 0 ? (
        <div className="flex justify-center h-[100vh] text-2xl text-gray-400">
          {" "}
          Not data 📂 !
        </div>
      ) : (
        <div className="mt-4 mx-4  gap-4 gap-y-8 grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listItem?.map((item: IProducts) => (
            <div
              key={item?.id}
              className=" relative  grid max-w-xs bg-white p-2   text-black hover:bg-gray-50 hover:text-blue-600  rounded-lg drop-shadow-2xl  transition duration-50 ease-in-out hover:scale-105 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="pb-2 rounded-lg  overflow-visible ">
                <img
                  className="object-cover h-48 w-full rounded-lg  "
                  src={item?.images[0]}
                  alt="product"
                />
              </div>
              <div>
                {" "}
                <Checkbox
                  isSelected={true}
                  onChange={() => handleCheckBox(item)}
                ></Checkbox>
              </div>
              <p className="font-semibold h-[50px] tracking-tight  dark:text-white">
                {item?.title}
              </p>{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
