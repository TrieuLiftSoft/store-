import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputProps } from "@nextui-org/react";

interface IInputProps extends InputProps {
  name: string;
}

const InputApp: React.FC<IInputProps> = ({
  name,
  placeholder,
  label,
  type,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <>
          <div className="w-full">
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {label}
            </p>
            <Input
              type={type}
              value={value || ""}
              onChange={(event) => onChange(event.target.value)}
              onBlur={onBlur}
              placeholder={placeholder}
            />
            {errors[name]?.message ? (
              <p className="flex justify-start font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {String(errors[name]?.message)}
              </p>
            ) : null}
          </div>
        </>
      )}
    />
  );
};

export default InputApp;
