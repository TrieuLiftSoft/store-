import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { SelectItem, Select } from "@nextui-org/react";
import { ratingData } from "../../data/defaultData";

interface IratingData {
  value?: number;
  label?: string;
}

const InputSelect = () => {
  const { control } = useFormContext();
  return (
    <section>
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
              {ratingData.map((e: IratingData, index: number) => {
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
