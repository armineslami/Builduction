import { FunctionComponent } from "react";
import {
  Box,
  Text,
  Card,
  Badge,
  VStack,
  Grid,
  GridItem,
  BadgeProps,
} from "@chakra-ui/react";
import Project from "@/models/Project";
import Link from "next/link";
import Utils from "@/utils";

interface ProjecRowProps {
  project: Project;
}

const ProjectRow: FunctionComponent<ProjecRowProps> = ({
  project,
}: ProjecRowProps) => {
  return (
    <Link href={`/project/${project.id}`}>
      <Box mb="8px">
        <Card p="16px">
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={2}
          >
            <GridItem colSpan={4} rowSpan={1}>
              <Text
                className="truncate"
                fontWeight="bold"
                fontSize="1rem"
                color="gray.900"
              >
                {project.title}
              </Text>
              <Text
                className="truncate"
                fontWeight="normal"
                fontSize="0.8rem"
                color="gray.500"
                mt={"8px"}
              >
                {Utils.convertEnglishNumberToPersian(
                  Utils.formatNumberWithComma(
                    project.landSize ? project.landSize.toString() : "0"
                  )
                )}{" "}
                متر
              </Text>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1}>
              {renderBadges(project)}
            </GridItem>
          </Grid>
        </Card>
      </Box>
    </Link>
  );
};

/**
 * Creates react element using {@link Badge} component.
 * @param project - A project to use it's props for badges rendering.
 * @returns react element.
 */
function renderBadges(project: Project): React.ReactElement {
  let buyBadge: BadgeProps | null = null;
  let participationBadge: BadgeProps | null = null;

  if (
    project.landPrice !== undefined ||
    project.purchasePricePerMeter !== undefined
  ) {
    buyBadge = (
      <Badge borderRadius="full" px="4" py="1" bg="blue.400">
        <Text color="white" fontWeight="bold">
          خرید
        </Text>
      </Badge>
    );
  }

  if (project.builderPercentage !== undefined) {
    participationBadge = (
      <Badge borderRadius="full" px="4" py="1" bg="red.400">
        <Text color="white" fontWeight="bold">
          مشارکت
        </Text>
      </Badge>
    );
  }

  return (
    <VStack alignItems={"end"}>
      <>
        {buyBadge}
        {participationBadge}
      </>
    </VStack>
  );
}

export default ProjectRow;
