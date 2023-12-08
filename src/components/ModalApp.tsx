/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputApp from "./InputApp";
import { InitItemProducts, InitProducts } from "../model/InitProducts";
import { useMutation } from "react-query";
import { createProductAPI, editProductAPI, getItemIdAPI } from "../api/ApiPage";
import { handleError } from "../helpers/HandleError";
import InputSelect from "./InputRating";
import productSchema from "../data/validate";
import useNotification from "../store/NotificationStore";

const ModalApp = ({
  titleModal,
  textBtn,
  itemId,
}: {
  titleModal: string;
  textBtn: string;
  itemId?: number;
}) => {
  const setSuccessTrue = useNotification((state) => state.setSuccessTrue);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [defaultProduct, setDefaultProduct] = useState<InitProducts>();
  const defaultValuesEdit = { ...defaultProduct };
  ///////
  //// call api product edit
  useEffect(() => {
    const fetchEditProducts = async () => {
      try {
        if (itemId !== undefined) {
          const response = await getItemIdAPI(itemId);
          setDefaultProduct(response);
          return response;
        }
      } catch (error) {
        handleError(error);
      }
    };

    if (itemId && isOpen) {
      fetchEditProducts();
    }
  }, [itemId, isOpen]);

  /////
  //reset state  using edit form
  useEffect(() => {
    reset(defaultValuesEdit);
  }, [itemId, defaultProduct]);

  /////
  /// useForm

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: defaultValuesEdit,
    resolver: yupResolver<InitItemProducts>(productSchema),
  });
  /////
  /// handle mMutation

  const addItemMutation = useMutation({
    mutationFn: (data: InitItemProducts) => createProductAPI(data),
    onSuccess: () => {
      reset();
      setSuccessTrue();
      console.log("create success");
    },
    onError: () => {
      // Handle mutation error
      console.error("create error ");
      // You can show an error message or perform other error-related actions here
    },
  });

  const editItemMutation = useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: number;
      data: InitItemProducts;
    }) => editProductAPI(itemId, data),
    onSuccess: () => {
      setSuccessTrue();
      reset();
      console.log("edit success");
    },
    onError: () => {
      console.error("edit error ");
    },
  });
  ////
  //handel form

  const onSubmit = async (data: InitItemProducts) => {
    console.log(data, "FORM CREATE");
    if (itemId !== undefined) {
      await editItemMutation.mutate({ itemId, data });
    } else {
      await addItemMutation.mutate(data);
    }
  };
  ///

  return (
    <>
      {textBtn === "Edit" ? (
        <Button variant="shadow" onPress={onOpen}>
          {" "}
          {textBtn}
        </Button>
      ) : (
        <Button color="primary" variant="shadow" onPress={onOpen}>
          {" "}
          {textBtn}
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{titleModal}</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody className="grid  gap-4  grid-cols-2">
                  <InputApp
                    styleContainer={""}
                    label={"Title"}
                    name="title"
                    placeholder={"Please enter title"}
                    control={control}
                    type="text"
                    message={errors?.title?.message || ""}
                  />

                  <InputApp
                    styleContainer={""}
                    label={"Price"}
                    name="price"
                    placeholder={"Please enter price"}
                    control={control}
                    type="number"
                    message={errors?.price?.message || ""}
                  />
                  <InputApp
                    styleContainer={""}
                    label={"Discount Percentage"}
                    name="discountPercentage"
                    placeholder={"Please enter discount Percentage"}
                    control={control}
                    type="number"
                    message={errors?.discountPercentage?.message || ""}
                  />

                  {itemId !== undefined ? (
                    <InputApp
                      styleContainer={""}
                      label={"Rating"}
                      name="rating"
                      placeholder={"Please enter rating"}
                      control={control}
                      type="number"
                      message={errors?.rating?.message || ""}
                    />
                  ) : null}
                  {itemId === undefined ? (
                    <InputSelect control={control} />
                  ) : null}
                  <InputApp
                    styleContainer={""}
                    label={"Stock"}
                    name="stock"
                    placeholder={"Please enter stock"}
                    control={control}
                    type="number"
                    message={errors?.stock?.message || ""}
                  />
                  <InputApp
                    styleContainer={""}
                    label={"Brand"}
                    name="brand"
                    placeholder={"Please enter brand"}
                    control={control}
                    type="text"
                    message={errors?.brand?.message || ""}
                  />
                  <InputApp
                    styleContainer={""}
                    label={"Category"}
                    name="category"
                    placeholder={"Please enter category"}
                    control={control}
                    type="text"
                    message={errors?.category?.message || ""}
                  />
                  <InputApp
                    styleContainer={""}
                    label={"Thumbnail"}
                    name="thumbnail"
                    placeholder={" Please enter thumbnail"}
                    control={control}
                    type="text"
                    message={errors?.thumbnail?.message || ""}
                  />
                  <InputApp
                    styleContainer={"col-span-2"}
                    label={"Description"}
                    name="description"
                    placeholder={"Please enter description"}
                    control={control}
                    type="text"
                    message={errors?.description?.message || ""}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {textBtn === "Edit" ? (
                    <Button color="primary" isDisabled={!isDirty} type="submit">
                      Submit
                    </Button>
                  ) : (
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  )}
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalApp;
