import React, { useEffect, useMemo, useState } from "react";
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
import {
  InitCreateProducts,
  InitProducts,
} from "../model/InitProducts";
import { useMutation } from "react-query";
import {
  createProductAPI,
  editProductAPI,
  getProductItemIdAPI,
} from "../api/ApiPage";
import { handleError } from "../helpers/HandleError";
import InputSelect from "./InputRating";

const productSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().required("did you forget about me? "),
  description: yup.string().required("did you forget about me?  "),
  price: yup.number().required("Required only number"),
  discountPercentage: yup.number(),
  rating: yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  stock: yup.number().required("Required only number"),
  brand: yup.string(),
  category: yup.string(),
  thumbnail: yup.string().url(),
});

const ModalApp = ({
  titleModal,
  textBtn,
  itemId,
}: {
  titleModal: string;
  textBtn: string;
  itemId?: number;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [defaultProduct, setDefaultProduct] = useState<InitProducts>();
  useEffect(() => {
    const fetchEditProducts = async () => {
      try {
        if (itemId !== undefined) {
          const response = await getProductItemIdAPI(itemId);
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

  const defaultValuesEdit = { ...defaultProduct };
  //delete defaultValuesEdit.images;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors , isDirty  },
  } = useForm({
    defaultValues: useMemo(() => {
      return defaultValuesEdit;
    }, [itemId]),
    resolver: yupResolver<InitCreateProducts>(productSchema),
  });


  useEffect(() => {
    reset(defaultValuesEdit);
  }, [itemId, defaultProduct]);

  const addItemMutation = useMutation({
    mutationFn: (data: InitCreateProducts) => createProductAPI(data),
    onSuccess: () => {
      reset();
      console.log("create success");
    },
    onError: () => {
      // Handle mutation error
      console.error('create error ');
      // You can show an error message or perform other error-related actions here
    },
  });

  const editItemMutation = useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: number;
      data: InitCreateProducts;
    }) => editProductAPI(itemId, data),
    onSuccess: () => {
      reset();
      console.log("edit success");
    },
    onError: () => {
      console.error('edit error ');
    },
  });



  const submitHandler = async (data: InitCreateProducts) => {
    console.log(data, "FORM CREATE");
    if (itemId !== undefined) {
      await editItemMutation.mutate({ itemId, data });
    } else {
      await addItemMutation.mutate(data);
    }
  };

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

                  {itemId !== undefined ? <InputApp
                    styleContainer={""}
                    label={"Rating"}
                    name="rating"
                    placeholder={"Please enter rating"}
                    control={control}
                    type="number"
                    message={errors?.rating?.message || ""}
                  /> : null}
                  {itemId === undefined ? <InputSelect control={control} /> : null}
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
                  <Button color="primary" isDisabled={!isDirty} type="submit">
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
