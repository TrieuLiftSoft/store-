import React from "react";
import CardApp from "../components/CardApp";
import useItemStore from "../store/ZustandStore";
import { useProductsAllQuery } from "../api/useQueryProduct";

const Home = () => {
  const { data: ProductsAll, isLoading, error } = useProductsAllQuery();
  const totalQuantity = useItemStore((state: any) => state.getTotalQuantity());
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      {ProductsAll ? (
        <>
          <p className="text-red-500">Quantity: {totalQuantity}</p>
          <CardApp data={ProductsAll} />
        </>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Home;
