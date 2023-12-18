/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Badge, Checkbox, Pagination } from "@nextui-org/react";
import { useQueryPagination } from "../api/QueryProductApi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IProducts } from "../model/InitProducts";

const pageSize = 5;
const totalPage = 6;

const PaginationScreen = () => {
  const params = useParams();
  const storedData = localStorage.getItem("DATA");

  const id = Number(params.pageNumber);
  const navigate = useNavigate();
  const [numberNotification, setNumberNotification] = useState(0);
  const [listItem, setListItem] = useState<IProducts[]>([]);
  const [skipState, setSkipState] = useState(1);
  const {
    isLoading,
    isError,
    data: paginationData,
  } = useQueryPagination(pageSize, skipState);
  const [checkedState, setCheckedState] = useState(
    new Array(paginationData?.products.length).fill(false),
  );

  //// handle click Check box
  const handleCheckBox = (data: IProducts) => {
    /// set State  true or false to array
    const updatedCheckedState = checkedState.map((item, index) =>
      index === data.id ? !item : item,
    );
    // check id true
    const checkID = listItem?.some((item) => item.id === data.id);
    // check Obj  === []  -> add item to Obj
    if (listItem?.length === 0) {
      setListItem((listItem) => [...(listItem || []), data]);
    }
    //// check Obj length > 0  and item.id != data.id -> add item to Obj
    else if (listItem?.length > 0 && checkID === false) {
      setListItem((listItem) => [...(listItem || []), data]);
    }
    //// check Obj != undefined  and checkState === true and item.id === data.id
    ///->  create Obj not data.id , set localStorage , update count  length
    else if (
      listItem !== undefined &&
      checkedState[data.id] &&
      checkID === true
    ) {
      const updateObj = listItem?.filter((item) => item.id !== data.id);
      localStorage.setItem("DATA", JSON.stringify(updateObj));
      setNumberNotification(updateObj?.length!);
      setListItem(updateObj);
    }
    setCheckedState(updatedCheckedState);
  };

  /// handle click Pagination
  const handlePagination = useCallback(
    (page: number) => {
      navigate(`/page/${page}`);
      if (page !== undefined) {
        const skipPage = (page - 1) * pageSize;
        setSkipState(skipPage);
      }
    },
    [skipState],
  );

  useEffect(() => {
    /// setItem localStore  if obj > 0
    if (typeof window !== "undefined" && listItem?.length > 0) {
      localStorage.setItem("DATA", JSON.stringify(listItem));
    }
    /// set length  if obj > 0
    if (listItem?.length > 0) {
      setNumberNotification(listItem?.length!);
    }
  }, [listItem]);

  useEffect(() => {
    /// set page  if id > 1
    if (id > 1) {
      const skipPageFresher = (id - 1) * pageSize;
      setSkipState(skipPageFresher);
    }
    /// reload page set data
    if (storedData) {
      const listItemData = JSON.parse(storedData!);
      const arrayStateCheckBox = listItemData.map((obj: IProducts) => obj.id);
      arrayStateCheckBox.forEach((index: number) => {
        checkedState[index] = true;
      });
      setListItem(listItemData);
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
          initialPage={1}
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="m-4 h-[100vh]">
      <div className="flex justify-end px-4">
        <Link to="/about">
          <Badge
            color="danger"
            content={numberNotification}
            isInvisible={false}
            shape="circle"
          >
            <p className="text-6xl font-serif hover:text-gray-400 font-extrabold">
              A{" "}
            </p>
          </Badge>
        </Link>
      </div>
      <div className="mt-4 mx-4  gap-4 gap-y-8 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {paginationData?.products?.map((item: IProducts) => (
          <div
            key={item?.id}
            className=" relative  grid max-w-xs bg-white p-2  rounded-lg text-black drop-shadow-2xl hover:text-blue-600  transition duration-50 ease-in-out hover:scale-105 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="pb-2 rounded-lg  overflow-visible ">
              <img
                className="object-cover h-48 w-full rounded-lg  "
                src={item?.images[0]}
                alt="product"
              />
            </div>
            <div>
              {" "}
              <Checkbox
                isSelected={checkedState[item.id]}
                onChange={() => handleCheckBox(item)}
              />
            </div>
            <p className="font-semibold h-[50px] tracking-tight dark:text-white">
              {item?.title}
            </p>{" "}
          </div>
        ))}
      </div>
      <Pagination
        className="flex justify-center mt-2 overflow-auto"
        isCompact
        variant="light"
        showControls
        total={totalPage}
        onChange={handlePagination}
        initialPage={id}
      />
    </div>
  );
};

export default PaginationScreen;
