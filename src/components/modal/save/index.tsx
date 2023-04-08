import { FormEvent, FunctionComponent, useRef } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";

interface SaveModalProps {
  projectTitle: string | undefined;
  isOpen: boolean;
  onSaveConfirm: (title: string) => void;
  onClose: () => void;
}

const SaveModal: FunctionComponent<SaveModalProps> = ({
  projectTitle,
  isOpen,
  onSaveConfirm,
  onClose,
}: SaveModalProps) => {
  const inputTitle = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputTitle.current?.value && inputTitle.current.value !== "") {
      onSaveConfirm(inputTitle.current.value);
      onClose();
    }
  };

  return (
    <>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#F7FAFC"}>
          <ModalHeader>
            <Text>ذخیره پروژه</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Text>برای ذخیره پروژه لطفا نام آن را مشخص کنید:</Text>
              <Input
                placeholder="نام پروژه"
                defaultValue={projectTitle}
                type={"text"}
                ref={inputTitle}
                mt={"16px"}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              بستن
            </Button>
            <Button className="blackButton" mr={3} onClick={(e) => onSubmit(e)}>
              ذخیره
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default SaveModal;
