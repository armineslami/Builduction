import React, { FunctionComponent } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Grid,
  GridItem,
  Tooltip,
  Card,
} from "@chakra-ui/react";
import Project from "@/models/Project";
import Utils from "@/utils";

interface CalculationModalProps {
  project: Project;
  isModalOpen: boolean;
  onModalClose: () => void;
}

const CalculationModal: FunctionComponent<CalculationModalProps> = ({
  project,
  isModalOpen,
  onModalClose,
}: CalculationModalProps) => {
  /** Helper functions to render multiple kind of texts using {@link Text} component. */

  function renderTitle(title: string): React.ReactElement {
    return (
      <Text
        fontSize={"1.2rem"}
        fontWeight={"bold"}
        color={"gray.900"}
        mt={"16px"}
        mb={"16px"}
      >
        {`• `}
        {title}
      </Text>
    );
  }

  function renderHead(title: string): React.ReactElement {
    return (
      <Text
        fontSize={"0.8rem"}
        fontWeight={"bold"}
        color={"gray.900"}
        mb={"8px"}
      >
        {title}
      </Text>
    );
  }

  function renderSubHead(title: string): React.ReactElement {
    return (
      <Text fontSize={"0.7rem"} color={"gray.500"} mb={"8px"}>
        {title}
      </Text>
    );
  }

  function renderNumbericText(
    number: number,
    unit: string
  ): React.ReactElement {
    return (
      <Box display={"flex"}>
        <Text fontSize={"0.75rem"} fontWeight={"bold"} color={"cyan.900"}>
          {Utils.convertEnglishNumberToPersian(
            Utils.formatNumberWithComma(number.toString())
          )}
        </Text>
        &nbsp;
        <Text fontSize={"0.7rem"} color={"gray.900"} mt={"0.05rem"}>
          {unit}
        </Text>
      </Box>
    );
  }

  return (
    <>
      <ChakraModal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent bg={"#F7FAFC"}>
          <ModalHeader>
            {project.title && project.title !== ""
              ? project.title
              : "اطلاعات پروژه"}
          </ModalHeader>
          <ModalCloseButton mt={"8px"} />
          <ModalBody>
            {renderTitle("هزینه و سود")}
            <Card p={"8px"}>
              {renderHead("خرید زمین")}
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={2}
              >
                <Tooltip
                  label={"مجموع هزینه ساخت + قیمت زمین + سایر هزینه‌ها"}
                  hasArrow
                  fontSize={"xs"}
                >
                  <GridItem colSpan={3} rowSpan={1} cursor={"default"}>
                    {renderSubHead("هزینه نهایی")}
                    {renderNumbericText(
                      project?.totalCostInCaseOfPurchase ?? 0,
                      "تومان"
                    )}
                  </GridItem>
                </Tooltip>
                <Tooltip
                  label={"ارزش کل واحدها - هزینه نهایی"}
                  hasArrow
                  fontSize={"xs"}
                >
                  <GridItem colSpan={3} rowSpan={1} cursor={"default"}>
                    {renderSubHead("سود نهایی")}
                    {renderNumbericText(
                      project?.builderProfitInCaseOfPurchase ?? 0,
                      "تومان"
                    )}
                  </GridItem>
                </Tooltip>
              </Grid>
            </Card>
            <Card p={"8px"} mt={"8px"}>
              {renderHead("مشارکت")}
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={2}
              >
                <Tooltip
                  label={"مجموع هزینه ساخت + اُوِر + سایر هزینه‌ها"}
                  hasArrow
                  fontSize={"xs"}
                >
                  <GridItem colSpan={3} rowSpan={1} cursor={"default"}>
                    {renderSubHead("هزینه نهایی")}
                    {renderNumbericText(
                      project?.totalCostInCaseOfParticipation ?? 0,
                      "تومان"
                    )}
                  </GridItem>
                </Tooltip>
                <Tooltip
                  label={"متراژ سهم سازنده * قیمت فروش هر متر - هزینه نهایی"}
                  hasArrow
                  fontSize={"xs"}
                >
                  <GridItem colSpan={3} rowSpan={1} cursor={"default"}>
                    {renderSubHead("سود نهایی")}
                    {renderNumbericText(
                      project?.builderProfitInCaseOfParticipation ?? 0,
                      "تومان"
                    )}
                  </GridItem>
                </Tooltip>
              </Grid>
            </Card>
            {renderTitle("سایر اطلاعات")}
            <Card p={"8px"} mt={"8px"}>
              {renderHead("زمین")}
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={2}
              >
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("متراژ")}
                  {renderNumbericText(project?.landSize ?? 0, "متر")}
                </GridItem>
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("قیمت هر متر")}
                  {renderNumbericText(
                    project?.purchasePricePerMeter ?? 0,
                    "تومان"
                  )}
                </GridItem>
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("قیمت زمین")}
                  {renderNumbericText(project?.landPrice ?? 0, "تومان")}
                </GridItem>
              </Grid>
            </Card>
            <Card p={"8px"} mt={"8px"}>
              {renderHead("ساختمان")}
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={2}
              >
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("واحدها")}
                  {renderNumbericText(project?.totalAreaToBuild ?? 0, "متر")}
                </GridItem>
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("انباری‌ها")}
                  {renderNumbericText(
                    (project?.warehouseCount ?? 0) *
                      (project?.warehouseArea ?? 0),
                    "متر"
                  )}
                </GridItem>
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("مجموع")}
                  {renderNumbericText(project?.totalAreaToSell ?? 0, "متر")}
                </GridItem>
                <Tooltip
                  label={"مجموع متراژ واحد‌ها و انباری * درصد مشارکت سازنده"}
                  hasArrow
                  fontSize={"xs"}
                >
                  <GridItem colSpan={2} rowSpan={1} cursor={"default"}>
                    {renderSubHead("سهم سازنده")}
                    {renderNumbericText(
                      project?.builderShareOfArea ?? 0,
                      "متر"
                    )}
                  </GridItem>
                </Tooltip>
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("تعداد طبقات")}
                  {renderNumbericText(project?.floorCount ?? 0, "عدد")}
                </GridItem>
                <Tooltip
                  label={"متراژ مجاز هر سقف ÷ ۲۵"}
                  hasArrow
                  fontSize={"xs"}
                >
                  <GridItem colSpan={2} rowSpan={1} cursor={"default"}>
                    {renderSubHead("پارکینگ مجاز")}
                    {renderNumbericText(
                      project?.maximumParkingCount ?? 0,
                      "عدد"
                    )}
                  </GridItem>
                </Tooltip>
                <GridItem colSpan={3} rowSpan={1}>
                  {renderSubHead("قیمت فروش هر متر")}
                  {renderNumbericText(
                    project?.salesPricePerMeter ?? 0,
                    "تومان"
                  )}
                </GridItem>
                <Tooltip
                  label={"(متراژ واحد‌ها + متراژ انباری‌ها) * قیمت فروش هر متر"}
                  hasArrow
                  fontSize={"xs"}
                >
                  <GridItem colSpan={3} rowSpan={1} cursor={"default"}>
                    {renderSubHead("ارزش کل واحدها")}
                    {renderNumbericText(
                      project?.totalValueOfProperty ?? 0,
                      "تومان"
                    )}
                  </GridItem>
                </Tooltip>
                <GridItem colSpan={3} rowSpan={1}>
                  {renderSubHead("هزینه ساخت هر متر")}
                  {renderNumbericText(project?.buildCostPerMeter ?? 0, "تومان")}
                </GridItem>
                <Tooltip
                  label={"متراژ واحد‌ها * هزینه ساخت هر متر"}
                  hasArrow
                  fontSize={"xs"}
                >
                  <GridItem colSpan={3} rowSpan={1} cursor={"default"}>
                    {renderSubHead("مجموع هزینه ساخت")}
                    {renderNumbericText(project?.buildCost ?? 0, "تومان")}
                  </GridItem>
                </Tooltip>
                <GridItem colSpan={3} rowSpan={1}>
                  {renderSubHead("سایر هزینه‌ها")}
                  {renderNumbericText(project?.otherCosts ?? 0, "تومان")}
                </GridItem>
              </Grid>
            </Card>
            <Card p={"8px"} mt={"8px"}>
              {renderHead("واحد")}
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(8, 1fr)"
                gap={2}
              >
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("متراژ مجاز")}
                  {renderNumbericText(
                    project?.eachFloorLegalAreaToBuild ?? 0,
                    "متر"
                  )}
                </GridItem>
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("متراژ خلاف")}
                  {renderNumbericText(project?.delictArea ?? 0, "متر")}
                </GridItem>
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("متراژ انباری")}
                  {renderNumbericText(project?.warehouseArea ?? 0, "متر")}
                </GridItem>
                <GridItem colSpan={2} rowSpan={1}>
                  {renderSubHead("مجموع")}
                  {renderNumbericText(
                    project?.eachFloorAreaToBuild ?? 0,
                    "متر"
                  )}
                </GridItem>
              </Grid>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button className="blackButton" mr={3} onClick={onModalClose}>
              بستن
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default CalculationModal;
