import { yupResolver } from "@hookform/resolvers/yup";
import { InitItemProducts } from "../model/InitProducts";
import productSchema from "./validate";
import { useForm } from "react-hook-form";

export const useCreateForm = ({
  defaultValuesEdit,
}: {
  defaultValuesEdit: InitItemProducts;
}) =>
  useForm({
    mode: "onBlur",
    defaultValues: defaultValuesEdit,
    resolver: yupResolver<InitItemProducts>(productSchema),
  });
