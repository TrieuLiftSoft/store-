/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { useQueryPagination } from "../api/QueryProductApi";
import { useParams, useNavigate } from "react-router-dom";
import CardScreen from '../components/card/CardApp';

const pageSize = 6;
const totalPage = 10;

const PaginationScreen =() => {
  const params = useParams();
  const idPage = Number(params.pageNumber);
  const navigate = useNavigate();
  const [skipState, setSkipState] = useState(1);
  const {
    isLoading,
    isError,
    data: paginationData,
  } = useQueryPagination(pageSize, skipState);
  
  /// handle click Pagination
  const handlePagination =  useCallback((page: number) => {
        const skipPage = (page - 1) * pageSize;
        setSkipState(skipPage);
        navigate(`/page/${page}`);
  },[skipState]);

  useEffect(() => {
    if (idPage > 1) {
      const skipPageFresher = (idPage - 1) * pageSize;
      setSkipState(skipPageFresher);
    }
  }, [idPage]);

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
          initialPage={idPage}
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
        initialPage={idPage}
      />
    </div>
  );
};

export default PaginationScreen;
