import { Control, FieldValues } from "react-hook-form";

export interface InputProps {
  message: string;
  control?: Control<FieldValues>;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  styleContainer: string;
}
