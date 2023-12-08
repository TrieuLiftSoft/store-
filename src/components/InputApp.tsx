import React, { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { InputProps } from "../model/InitComponents";

const InputApp: React.FC<InputProps> = ({
  control,
  name,
  placeholder,
  label,
  type,
  message,
  styleContainer,
}) => {
  return (
    <div className={styleContainer}>
      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </p>
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
                className=""
                variant={"flat"}
                type={type}
                value={value || ""}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
              />
            </div>
            {error ? (
              <p className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {message}
              </p>
            ) : null}
          </>
        )}
      />
    </div>
  );
};

export default InputApp;
