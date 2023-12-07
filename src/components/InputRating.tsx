import * as React from "react";
import { Controller } from "react-hook-form";
import { SelectItem, Select } from "@nextui-org/react";

const  ratingData=  [
    { value: 0 ,label:""},
    { value: 1, label: "1 ⭐" },
    { value: 2, label: "2 ⭐⭐" },
    { value: 3, label: "3 ⭐⭐⭐" },
    { value: 4, label: "4 ⭐⭐⭐⭐" },
    { value: 5, label: "5 ⭐⭐⭐⭐⭐" },
];
const InputSelect = ({ control }: { control: any }) => {

  return (
    <section >
        <label htmlFor="rating-select">Rating</label>
      <Controller
        name="rating"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Select
            id="rating-select"
            label="Rating" 
              value={value}
              onChange={onChange}
            >
              {ratingData.map((e: any, index: number) => {
                return (
                  <SelectItem key={index} value={e.value}>
                    {e.label}
                  </SelectItem>
                );
              })}
            </Select>
          </>
        )}
      />
    </section>
  );
};
export default InputSelect;