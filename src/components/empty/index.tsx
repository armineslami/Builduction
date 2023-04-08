import { Text, VStack, Image } from "@chakra-ui/react";
import { FunctionComponent } from "react";

const Empty: FunctionComponent = () => {
  return (
    <div className="center">
      <VStack w="200px" h="200px">
        <Image alt="empty" src="/images/directory.png" w="100px" h="100px" />
        <Text>پروژه‌ای وجود ندارد</Text>
      </VStack>
    </div>
  );
};

export default Empty;
