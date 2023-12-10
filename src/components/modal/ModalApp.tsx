/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import FromCreateApp from "../FormCreateApp";

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
              <FromCreateApp
                textBtn={textBtn}
                itemId={itemId}
                isOpen={isOpen}
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalApp;
