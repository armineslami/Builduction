import { Center, Link, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

const Footer: FunctionComponent<any> = () => {
  return (
    <Center>
      <Text fontSize="0.7rem" mt="8px" color="gray.500">
        ایجاد شده توسط{" "}
        <Link
          isExternal
          href="http://github.com/armineslami"
          color="black"
          dir="ltr"
        >
          @armineslami
        </Link>
      </Text>
    </Center>
  );
};

export default Footer;
