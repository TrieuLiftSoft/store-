import React from "react";
import CardScreen from "../components/CardScreen";
import useItemStore from "../store/ZustandStore";
import { useQueryProducts } from "../api/useQueryProduct";
import PaginationScreen from "../components/PaginationScreen";

const Home = () => {
  const { data: ProductsAll, isLoading, error } = useQueryProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <div className="h-[35vh] m-10">
        <PaginationScreen />
      </div>

      <div className="bg-white">
        {ProductsAll ? (
          <>
            <CardScreen data={ProductsAll} />
          </>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
