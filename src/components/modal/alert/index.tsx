import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface AlertModalProps {
  title: string;
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

const AlertModal: FunctionComponent<AlertModalProps> = ({
  title,
  text,
  isOpen,
  onClose,
}: AlertModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered trapFocus={false}>
      <ModalOverlay />
      <ModalContent bg={"#F7FAFC"}>
        <ModalHeader>
          <Text>{title}</Text>
        </ModalHeader>
        <ModalBody>
          <Text>{text}</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            بستن
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AlertModal;
