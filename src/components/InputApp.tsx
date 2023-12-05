import React, { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import {Input} from "@nextui-org/react";

const InputApp = ({
  control,
  name,
  placeholder,
  label,
  message,
}: {
  message: string;
  control: any;
  name: string;
  type: string;
  placeholder: string;
  label: string;
}) => {

  return (
    <div className="">
      <p>{label}</p>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange, onBlur, ref },
          fieldState: { error },
        }) => (
          <>
            <div>
              <Input
                variant={"flat"}
                type="text"
                value={value || ""}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                onFocus={ref}
              />
            </div>
            {error ? <p>{message}</p> : null}
          </>
        )}
      />
    </div>
  );
};

export default InputApp;
