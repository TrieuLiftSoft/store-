import React, { useEffect, useState } from "react";
import CardApp from "../components/CardApp";
import NarBav from "../components/Navbar";

const Home = () => {
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = "https://dummyjson.com/products"; // Replace with the actual API endpoint
        const response = await fetch(apiUrl);

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const productsData = await response.json();
        setListProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log(listProducts, "SHOWDATA");
  return (
    <div className=" ">
      <NarBav />
      <CardApp data={listProducts} />
    </div>
  );
};

export default Home;
