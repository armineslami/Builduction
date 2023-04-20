import { Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FunctionComponent } from "react";

const Empty: FunctionComponent = () => {
  return (
    <div className="center">
      <VStack w="200px" h="200px" spacing={4}>
        <Image
          priority={true}
          alt="empty"
          src="/images/empty.webp"
          width={64}
          height={64}
        />
        <Text fontSize={"0.8rem"}>پروژه‌ای وجود ندارد</Text>
      </VStack>
    </div>
  );
};

export default Empty;
