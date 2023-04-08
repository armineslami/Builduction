import { Spinner, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface LoadingProps {
  size: string;
}

const Loading: FunctionComponent<LoadingProps> = ({ size }) => {
  return (
    <div className="center">
      <VStack w="200px">
        <Spinner size={size} />
      </VStack>
    </div>
  );
};

export default Loading;
