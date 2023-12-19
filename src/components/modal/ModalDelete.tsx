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
import { useMutation } from "react-query";
import useNotification from "../../store/NotificationStore";
import { fetchDeleteProducts } from "../../api/ProductApi";

const ModalDelete = ({ id ,title}: { id: number ,title ?:string}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const setSuccessTrue = useNotification((state) => state.setSuccessTrue);

  const deleteItemMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeleteProducts(id),
    onSuccess: () => {
      setSuccessTrue();
      console.log("Delete success");
    },
    onError: () => {
      console.error("Delete error ");
    },
  });

  const handleDelete = async () => {
    await deleteItemMutation.mutate({ id });
  };

  return (
    <>
      <div>
        <Button
          onPress={onOpen}
          isIconOnly
          color="danger"
          className="absolute  top-0 right-0 rounded-lg "
          size="sm"
        >
          x
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white ">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <p className="">
                  You sure <span className="text-red-400">delete </span> product ? <div className="text-2xl font-extrabold">{title}</div>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" variant="light" onClick={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalDelete;
