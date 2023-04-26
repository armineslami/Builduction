import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

type NotificationPermissionPromptProps = {
  isOpen: boolean;
  onPromptClose: () => void;
  onPermissionDenied: () => void;
  onPermissionGained: () => void;
};

const NotificationPermissionPrompt: FunctionComponent<
  NotificationPermissionPromptProps
> = ({
  isOpen,
  onPromptClose,
  onPermissionDenied,
  onPermissionGained,
}: NotificationPermissionPromptProps) => {
  // Font size of texts
  const fontSize = "0.8rem";

  return (
    <>
      <Modal onClose={onPromptClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>درخواست دسترسی</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              آیا به نرم افزار دسترسی لازم برای ارسال ناتیفیکیشن را می‌دهید؟
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onPermissionDenied}>
              خیر
            </Button>
            <Button className="blackButton" mr={3} onClick={onPermissionGained}>
              بله
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationPermissionPrompt;
