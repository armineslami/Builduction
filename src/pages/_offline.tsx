import Image from "next/image";
import { Text, VStack, Box, Center } from "@chakra-ui/react";
import { FunctionComponent } from "react";

const Fallback: FunctionComponent = () => (
  <>
    <Center>
      <Box
        position="relative"
        w={{
          base: "400px",
          sm: "100%",
          md: "75%",
          lg: "50%",
          xl: "%25",
          "2xl": "30%",
        }}
        minH="500px"
        p="16px"
      >
        <div className="center">
          <VStack spacing={12}>
            <Image
              priority={true}
              alt="offline"
              src="/images/offline.webp"
              width={128}
              height={128}
            />
            <Text fontSize={"0.8rem"}>اینترنت دستگاه شما قطع می‌باشد</Text>
          </VStack>
        </div>
      </Box>
    </Center>
  </>
);

export default Fallback;
