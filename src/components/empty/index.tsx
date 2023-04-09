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
          width={100}
          height={100}
        />
        <Text>پروژه‌ای وجود ندارد</Text>
      </VStack>
    </div>
  );
};

export default Empty;
