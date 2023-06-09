import { FormEvent, FunctionComponent } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
} from "@chakra-ui/react";

interface DeleteModalProps {
  isOpen: boolean;
  onDeleteConfirm: () => void;
  onClose: () => void;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  isOpen,
  onDeleteConfirm,
  onClose,
}: DeleteModalProps) => {
  const onCloseConfirm = async (e: FormEvent) => {
    e.preventDefault();
    onDeleteConfirm();
    onClose();
  };

  return (
    <>
      <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={"#F7FAFC"}>
          <ModalHeader>
            <Text>حذف پروژه</Text>
          </ModalHeader>
          <ModalBody>
            <Text>آیا از حذف پروژه خود اطمینان دارید؟</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              بستن
            </Button>
            <Button
              colorScheme={"red"}
              mr={3}
              onClick={(e) => onCloseConfirm(e)}
            >
              حذف
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default DeleteModal;
