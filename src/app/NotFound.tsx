import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex  flex-col w-full justify-center  bg-white text-2xl ">
      <div className="flex justify-center ">
        <p className="text-2xl">404</p>
      </div>
      <div className="flex justify-center ">
        <Link to="/">
          <Button>Go to the home page</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
