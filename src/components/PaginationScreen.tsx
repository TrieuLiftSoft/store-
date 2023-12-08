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
import { columns } from "../data/defaultData";

const pageSize = 5;
const totalPage = 10;

const PaginationScreen = () => {
  const [skipState, setSkipState] = useState(1);
  const {
    isLoading,
    isError,
    data: PaginationData,
  } = useQueryPagination(pageSize, skipState);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="">
      <Table aria-label="Example  table with dynamic content" className="">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={PaginationData?.products}>
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
        total={totalPage}
        onChange={(page) => {
          if (page !== null) {
            setSkipState(page);
          }
        }}
        initialPage={1}
      />
    </div>
  );
};

export default PaginationScreen;
