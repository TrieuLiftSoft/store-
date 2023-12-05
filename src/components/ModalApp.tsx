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

const schema = yup
.object({
  email: yup
    .string()
    .required("error "),
  password: yup
    .string()
    .required("error")
})
.required();

const ModalApp = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
              <ModalHeader className="flex flex-col gap-1">
                CREACT FORM
              </ModalHeader>
              <ModalBody>
               
              <InputApp
                label={"email"}
                name="email"
                placeholder={"placeholder_email"}
                control={control}
                type="text"
                message={errors?.email?.message || ""}
              />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalApp;
