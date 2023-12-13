import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { useQueryPagination } from "../api/useQueryProduct";
import { PaginationTable, columns } from "../data/defaultData";

const pageSize = 5;
const totalPage = 10;

const PaginationScreen = () => {
  const [skipState, setSkipState] = useState(1);
  const {
    isLoading,
    isError,
    data: paginationData,
  } = useQueryPagination(pageSize, skipState);
  const handlePagination = (page: number) => {
    if (page !== null) {
      setSkipState(page);
    }
  };
  if (isLoading) {
    return (
      <>
        <Table aria-label="Example table with dynamic content" className="">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={PaginationTable}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          className="flex justify-center mt-1 overflow-auto"
          isCompact
          showControls
          total={10}
          initialPage={1}
        />
      </>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="drop-shadow-xl">
      <Table aria-label="Example  table with dynamic content" className="">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginationData?.products}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        className="flex justify-center mt-2 overflow-auto"
        isCompact
        showControls
        total={totalPage}
        onChange={handlePagination}
        initialPage={1}
      />
    </div>
  );
};

export default PaginationScreen;
