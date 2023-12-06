import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputApp from "./InputApp";
import { InitCreateProducts } from "../model/InitProducts";
import { useMutation } from "react-query";

const productSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().required("did you forget about me? "),
  description: yup.string().required("did you forget about me?  "),
  price: yup.number().required("Required only number"),
  discountPercentage: yup.number(),
  rating: yup.number(),
  stock: yup.number().required("Required only number"),
  brand: yup.string(),
  category: yup.string(),
  thumbnail: yup.string().url(),
});

const ModalApp = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const addItemMutation = useMutation(async (data: InitCreateProducts) => {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to add item");
    }

    return response.json();
  });

  const submitHandler = async (data: InitCreateProducts) => {
    console.log(data, "FORM CREATE");
    try {
      await addItemMutation.mutateAsync(data);
      reset();
      console.log("success");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  return (
    <>
      <Button color="primary" variant="shadow" onPress={onOpen}>
        {" "}
        + Create Product
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>CREACT FORM</ModalHeader>
              <form onSubmit={handleSubmit(submitHandler)}>
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
                  <InputApp
                    styleContainer={""}
                    label={"Rating"}
                    name="rating"
                    placeholder={"Please enter rating"}
                    control={control}
                    type="number"
                    message={errors?.rating?.message || ""}
                  />
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
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
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
