import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
  Icon,
  Checkbox,
} from "@chakra-ui/react";
import Image from "next/image";
import { FunctionComponent } from "react";
import { IoShareOutline } from "react-icons/io5";
import { CgAddR } from "react-icons/cg";
import { FiMoreVertical } from "react-icons/fi";

type InstallPromptProps = {
  isOpen: boolean;
  platform: string | undefined;
  onPromptClose: (
    isStopShowingPwaInstallPromptCheckBoxChecked: boolean
  ) => void;
};

const InstallPrompt: FunctionComponent<InstallPromptProps> = ({
  isOpen,
  platform,
  onPromptClose,
}: InstallPromptProps) => {
  // Font size of texts
  const fontSize = "0.8rem";

  // Platforms that can show the prompt
  const PLATFORMS = { ios: "ios", android: "android" };

  let isCheckboxChecked = false;

  function renderIosPrompt(): React.ReactElement {
    return (
      <>
        <HStack fontSize={fontSize}>
          <Text>۱- در نوار پایین روی گزینه</Text>
          ‍<Icon as={IoShareOutline} color="blue.500" />
          <Text>بزنید.</Text>
        </HStack>
        <HStack fontSize={fontSize}>
          <Text>۲- گزینه</Text>
          <Icon as={CgAddR} color="gray.900" mb={"4px !important"} />
          <Text>Add to Home Screen</Text>
          <Text>را انتخاب نمایید.</Text>
        </HStack>
        <HStack fontSize={fontSize}>
          <Text>۳- گزینه</Text>
          <Text color={"blue.500"}>Add</Text>
          <Text>را از قسمت بالا سمت راست انتخاب نمایید.</Text>
        </HStack>
      </>
    );
  }

  function renderAndroidPrompt(): React.ReactElement {
    return (
      <>
        <HStack fontSize={fontSize}>
          <Text>۱- در نوار بالا روی گزینه</Text>
          ‍<Icon as={FiMoreVertical} />
          <Text>بزنید.</Text>
        </HStack>
        <HStack fontSize={fontSize}>
          <Text>۲- گزینه</Text>
          <Text>Add to Home screen</Text>
          <Text>را انتخاب نمایید.</Text>
        </HStack>
        <HStack fontSize={fontSize}>
          <Text>۳- گزینه</Text>
          <Text color={"blue.500"}>Add</Text>
          <Text>را انتخاب نمایید.</Text>
        </HStack>
      </>
    );
  }

  return (
    <>
      <Modal
        onClose={() => onPromptClose(isCheckboxChecked)}
        size="full"
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack spacing={6} mt={"32px"}>
              <Image
                priority={true}
                alt="empty"
                src="/images/icon-192x192.png"
                width={64}
                height={64}
              />
              <Text
                textAlign={"center"}
                mt={"32px"}
                mb={"32px"}
                fontWeight={"bold"}
              >
                وب اپلیکیشن Builduction را به صفحه‌ی اصلی دستگاه خود اضافه کنید:
              </Text>
              <Divider />
              {platform === PLATFORMS.ios
                ? renderIosPrompt()
                : renderAndroidPrompt()}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack width={"100%"}>
              <Button
                className="blackButton"
                variant="solid"
                width={"100%"}
                onClick={(e) => {
                  e.preventDefault();
                  onPromptClose(isCheckboxChecked);
                }}
              >
                متوجه شدم
              </Button>
              <HStack>
                <Checkbox
                  colorScheme={"teal"}
                  onChange={(e) => (isCheckboxChecked = e.target.checked)}
                />
                <Text fontSize={fontSize}>دیگر این صفحه را نمایش نده</Text>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InstallPrompt;
