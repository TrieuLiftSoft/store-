import { yupResolver } from "@hookform/resolvers/yup";
import { InitItemProducts, InitProducts } from "../model/InitProducts";
import productSchema from "./validate";
import { useForm } from "react-hook-form";

export const useCreateForm = ({
  defaultValuesEdit,
}: {
  defaultValuesEdit: InitProducts;
}) =>
  useForm({
    mode: "onBlur",
    defaultValues: defaultValuesEdit,
    resolver: yupResolver<InitItemProducts>(productSchema),
  });
