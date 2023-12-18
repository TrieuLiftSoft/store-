import { yupResolver } from "@hookform/resolvers/yup";
import { IProductsItemOption } from "../model/InitProducts";
import productSchema from "./validate";
import { useForm } from "react-hook-form";

export const useCreateForm = ({
  defaultValuesEdit,
}: {
  defaultValuesEdit: IProductsItemOption;
}) =>
  useForm({
    mode: "onBlur",
    defaultValues: defaultValuesEdit,
    resolver: yupResolver<IProductsItemOption>(productSchema),
  });
