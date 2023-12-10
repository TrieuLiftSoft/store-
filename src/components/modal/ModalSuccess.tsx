import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import useNotification from "../../store/NotificationStore";

const ModalSuccess = () => {
  const isSuccess = useNotification((state) => state.isSuccess);
  const setSuccessFalse = useNotification((state) => state.setSuccessFalse);
  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        setSuccessFalse();
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isSuccess]);

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isSuccess}>
        <ModalContent className="bg-white ">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <p className="text-4xl flex justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                  Success ✔️
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalSuccess;
