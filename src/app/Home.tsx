import React from "react";
import CardScreen from "./CardScreen";
import { useQueryProducts } from "../api/useQueryProduct";
import PaginationScreen from "./PaginationScreen";
import PopoverApp from "../components/PopoverApp";
import NarBav from "../components/Navbar";

const Home = () => {
  const { data: productsAll, isLoading, error } = useQueryProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="">
      <NarBav />
      <div className="h-[35vh] m-10">
        <PaginationScreen />
      </div>
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
