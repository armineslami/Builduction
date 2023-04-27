import { Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FunctionComponent } from "react";

const Empty: FunctionComponent = () => {
  return (
    <div className="center">
      <VStack w="200px" spacing={4}>
        <Image
          priority={true}
          alt="empty"
          src="/images/empty.webp"
          width={64}
          height={64}
        />
        <Text fontSize={"0.85rem"} fontWeight={"bold"} textAlign={"center"}>
          پروژه‌ای ندارید
        </Text>
        <Text
          fontSize={"0.8rem"}
          minWidth={"300px"}
          textAlign={"center"}
          mt={"4px !important"}
        >
          با انتخاب گزینه افزودن، پروژه جدیدی ایجاد کنید
        </Text>
      </VStack>
    </div>
  );
};

export default Empty;
