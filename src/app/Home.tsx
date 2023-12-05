import React, { useEffect, useState } from "react";
import CardApp from "../components/CardApp";
import { useQuery } from 'react-query';

const fetchData = async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data;
}; 

const Home = () => {
  const { data, error, isLoading }: any = useQuery('myData', fetchData);
  console.log(data)
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <CardApp data={data} />
    </div>
  );
};

export default Home;
