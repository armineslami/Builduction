import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useRef } from "react";

type NotificationPermissionPromptProps = {
  isOpen: boolean;
  onPromptClose: () => void;
  onConfirm: () => void;
};

const NotificationPermissionPrompt: FunctionComponent<
  NotificationPermissionPromptProps
> = ({
  isOpen,
  onPromptClose,
  onConfirm,
}: NotificationPermissionPromptProps) => {
  return (
    <>
      <Modal
        onClose={onPromptClose}
        isOpen={isOpen}
        trapFocus={false}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>درخواست دسترسی</Text>
          </ModalHeader>
          <ModalBody>
            <Text fontSize={"0.85rem"} lineHeight={"1.5rem"}>
              نرم افزار برای ارسال ناتیفیکیشن به تایید شما برای دسترسی احتیاج
              دارد. پس از بستن این پنجره درخواست دسترسی برای شما نمایش داده
              خواهد شده که در صورت تمایل به دریافت ناتیفیکشن کافیست گزینه Allow
              را انتخاب نمایید.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              className="blackButton"
              width={"100%"}
              mr={3}
              onClick={onConfirm}
            >
              متوجه شدم
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationPermissionPrompt;
