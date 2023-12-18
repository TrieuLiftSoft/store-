import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IProductsItemOption } from "../model/InitProducts";
import productSchema from "./validate";

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
