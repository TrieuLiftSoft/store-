/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, ModalBody } from "@nextui-org/react";
import { FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import InputApp from "../input/InputApp";
import { IProductsItemOption } from "../../model/InitProducts";
import { createProductAPI, editProductAPI } from "../../api/ApiPage";
import InputSelect from "../input/InputRating";
import useNotification from "../../store/NotificationStore";
import TextareaApp from "../input/TextareaApp";
import { useCreateForm } from "../../data/formData";
import { useQueryEdit } from "../../api/QueryProductApi";

const FromCreateApp = ({
  textBtn,
  itemId,
}: {
  textBtn: string;
  itemId?: number;
}) => {
  const { data: editProduct } = useQueryEdit(itemId);
  const setSuccessTrue = useNotification((state) => state.setSuccessTrue);
  const defaultValuesEdit = { ...editProduct };
  const methods = useCreateForm({ defaultValuesEdit });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const addItemMutation = useMutation({
    mutationFn: ({ data }: { data: IProductsItemOption }) =>
      createProductAPI(data),
    onSuccess: (data) => {
      reset();
      setSuccessTrue();
      console.log(data, "create success");
    },
    onError: (error) => {
      console.error(error, "create error ");
    },
  });

  const editItemMutation = useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: number;
      data: IProductsItemOption;
    }) => editProductAPI(itemId, data),
    onSuccess: (data) => {
      setSuccessTrue();
      console.log(data, "edit success");
    },
    onError: (error) => {
      console.error(error, "edit error ");
    },
  });

  const onSubmit = async (data: IProductsItemOption) => {
    console.log(data, "FORM CREATE");
    if (itemId !== undefined) {
      await editItemMutation.mutate({ itemId, data });
    } else {
      await addItemMutation.mutate({ data });
    }
  };

  //reset state  using edit form
  useEffect(() => {
    reset(defaultValuesEdit);
  }, [itemId, editProduct]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody className="grid  gap-4  grid-cols-2">
            <InputApp
              label="Title"
              name="title"
              placeholder={"Please enter title"}
            />
            <InputApp
              label={"Price"}
              name="price"
              placeholder={"Please enter price"}
            />
            <InputApp
              label={"Discount Percentage"}
              name="discountPercentage"
              placeholder={"Please enter discount Percentage"}
            />

            {itemId !== undefined ? (
              <InputApp
                label="Rating"
                name="rating"
                placeholder="Please enter rating"
              />
            ) : null}
            {itemId === undefined ? <InputSelect /> : null}
            <InputApp
              label="Stock"
              name="stock"
              placeholder="Please enter stock"
            />
            <InputApp
              label="Brand"
              name="brand"
              placeholder="Please enter brand"
            />
            <InputApp
              label="Category"
              name="category"
              placeholder="Please enter category"
            />
            <InputApp
              label="Thumbnail"
              name="thumbnail"
              placeholder=" Please enter thumbnail"
            />
          </ModalBody>
          <div className="flex w-full px-6">
            <TextareaApp
              label="Description"
              name="description"
              placeholder="Please enter description"
            />
          </div>
          <div className="flex flex-col w-full px-6 py-4">
            {textBtn === "Edit" ? (
              <Button
                className="flex w-full "
                color="primary"
                isDisabled={!isDirty}
                type="submit"
              >
                Submit
              </Button>
            ) : (
              <Button className="flex w-full" color="primary" type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};
export default FromCreateApp;
