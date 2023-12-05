import React from "react";
import RatingCard from "./RatingCard";
import ButtonApp from "./ButtonApp";

interface InitProducts {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
interface dataProducts {
  limit: number;
  products: InitProducts[];
  skip: number;
  total: number;
}
interface CardAppProps {
  data: dataProducts[];
}
const CardApp: React.FC<CardAppProps> = ({ data }) => {
  const { products }: any = data;
  return (
    <div className="mt-4 mx-2  gap-3 grid grid-cols-2 sm:grid-cols-4">
      {products?.map((item: any, index: number) => (
        <div
          key={index}
          className=" grid max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="pb-2 rounded-lg  overflow-visible ">
            <img
              className="object-cover h-48 w-full rounded-lg  "
              src={item.images[0]}
              alt="product image"
            />
          </div>
          <div className="px-4 pb-3 flex flex-col justify-between">
            <div className="flex flex-col">
              <div>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="text-[14px]">Number: {item.stock}</p>
              </div>

              <p className="text-gray-400">#{item.category}</p>
              <p className=" text-[12px] ">{item.description}</p>
              <RatingCard rating={item.rating} />
            </div>
            <div className="flex flex-col items-center justify-between">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${item.price}
              </span>
              <p className="text-red-500 text-[14px]">
                -%{item.discountPercentage}
              </p>

              <ButtonApp title={"ADD ITEM"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CardApp;
