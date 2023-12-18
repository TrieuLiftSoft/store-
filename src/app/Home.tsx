import React from "react";
import CardScreen from "./CardScreen";
import { useQueryProducts } from "../api/QueryProductApi";
import PopoverApp from "../components/PopoverApp";

const Home = () => {
  const { data: productsAll, isLoading, error } = useQueryProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center bg-white text-2xl ">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center bg-white text-2xl ">
        <p className="text-red-400">Error: {error.message}</p>
      </div>
    );
  }
  return (
    <div className="">
      <div className="bg-slate-50 py-10 mx-5">
        {productsAll ? (
          <>
            <div className="flex justify-end mr-5">
              <PopoverApp />
            </div>
            <CardScreen data={productsAll} />
          </>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
