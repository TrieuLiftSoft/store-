/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryPagination } from "../api/QueryProductApi";
import CardScreen from "../components/card/CardApp";


const pageSize = 6;
const totalPage = 10;

const ProductsScreen = () => {
  const params = useParams();
  const idPage = Number(params.pageNumber);
  const navigate = useNavigate();
  const [skipState, setSkipState] = useState(1);
  const {
    isLoading,
    isError,
    data: paginationData,
  } = useQueryPagination(pageSize, skipState);

  const handlePagination = useCallback(
    (page: number) => {
      if(page !== undefined){
        navigate(`/page/${page}`);
        const skipPage = (page - 1) * pageSize;
        setSkipState(skipPage);
      }
    },
    [skipState,navigate],
  );

  useEffect(() => {
    if (idPage > 1) {
      const skipPageFresher = (idPage - 1) * pageSize;
      setSkipState(skipPageFresher);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="m-4 h-[100vh]">
        <div className="flex justify-center  h-[200px] text-2xl text-gray-400">
          {" "}
          <p>Loading ...</p>
        </div>
        <Pagination
          className="flex justify-center mt-1 overflow-auto"
          isCompact
          showControls
          total={10}
          onChange={handlePagination}
          initialPage={idPage | 1}
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="m-4 h-[100vh]">
      <div className="">
        <CardScreen data={paginationData} />
      </div>
      <Pagination
        className="flex justify-center mt-2 overflow-auto"
        isCompact
        showControls
        total={totalPage}
        onChange={handlePagination}
        initialPage={idPage | 1}
      />
    </div>
  );
};

export default ProductsScreen;
