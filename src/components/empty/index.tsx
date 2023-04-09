import { Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FunctionComponent } from "react";

const Empty: FunctionComponent = () => {
  return (
    <div className="center">
      <VStack w="200px" h="200px">
        <Image
          priority={true}
          alt="empty"
          src="/images/directory.png"
          style={{ width: "100px", height: "100px" }}
        />
        <Text>پروژه‌ای وجود ندارد</Text>
      </VStack>
    </div>
  );
};

export default Empty;
