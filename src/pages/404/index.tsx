import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <Box position="relative" minH="500px" bg="white" p="16px">
      <Center>
        <div className="center">
          <VStack>
            <Heading fontSize={"6rem"}>404</Heading>
            <Text>صفحه مورد نظر یافت نشد</Text>
            <Link href={"/"}>
              <Button className="blackButton" mt={"32px"}>
                بازگشت به خانه
              </Button>
            </Link>
          </VStack>
        </div>
      </Center>
    </Box>
  );
};

export default PageNotFound;
