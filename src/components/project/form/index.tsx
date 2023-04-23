import {
  Box,
  Center,
  Grid,
  GridItem,
  Input,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FunctionComponent, useRef, FormEvent } from "react";
import { BsCalculatorFill, BsFillSave2Fill } from "react-icons/bs";
import Project from "@/models/Project";

interface ProjectFormProps {
  project: Project;
  onCalculate: (project: Project) => void;
  onSave: (project: Project) => void;
}

const ProjectForm: FunctionComponent<ProjectFormProps> = ({
  project,
  onCalculate,
  onSave,
}: ProjectFormProps) => {
  const submit = async (event: FormEvent) => {
    readInputs(event);
    onCalculate(project);
  };

  const save = async (event: FormEvent) => {
    readInputs(event);
    onSave(project);
  };

  /**
   * Reads value of form inputs and set them to the {@link project}.
   * @param event - A form event to read inputs value from it.
   */
  const readInputs = (event: FormEvent) => {
    event.preventDefault();

    const {
      landSize,
      densityPercentage,
      floorCount,
      warehouseCount,
      warehouseArea,
      buildCostPerMeter,
      salesPricePerMeter,
      delictArea,
      delictPenaltyPerMeter,
      builderPercentage,
      over,
      purchasePricePerMeter,
      landPrice,
      otherCosts,
    } = (event.target as any).elements;

    project.landSize =
      landSize?.value && landSize.value !== ""
        ? Number.parseFloat(landSize.value)
        : undefined;

    project.densityPercentage =
      densityPercentage?.value && densityPercentage.value !== ""
        ? Number.parseFloat(densityPercentage.value)
        : undefined;

    project.floorCount =
      floorCount?.value && floorCount.value !== ""
        ? Number.parseInt(floorCount.value)
        : undefined;

    project.warehouseCount =
      warehouseCount?.value && warehouseCount.value !== ""
        ? Number.parseInt(warehouseCount.value)
        : undefined;

    project.warehouseArea =
      warehouseArea?.value && warehouseArea.value !== ""
        ? Number.parseFloat(warehouseArea.value)
        : undefined;

    project.buildCostPerMeter =
      buildCostPerMeter?.value && buildCostPerMeter.value !== ""
        ? Number.parseInt(buildCostPerMeter.value)
        : undefined;

    project.salesPricePerMeter =
      salesPricePerMeter?.value && salesPricePerMeter.value !== ""
        ? Number.parseInt(salesPricePerMeter.value)
        : undefined;

    project.delictArea =
      delictArea?.value && delictArea.value !== ""
        ? Number.parseFloat(delictArea.value)
        : 0;

    project.delictPenaltyPerMeter =
      delictPenaltyPerMeter?.value && delictPenaltyPerMeter.value !== ""
        ? Number.parseInt(delictPenaltyPerMeter.value)
        : 0;

    project.builderPercentage =
      builderPercentage?.value && builderPercentage.value !== ""
        ? Number.parseFloat(builderPercentage.value)
        : undefined;

    project.over =
      over?.value && over.value !== ""
        ? Number.parseInt(over.value)
        : undefined;

    project.purchasePricePerMeter =
      purchasePricePerMeter?.value && purchasePricePerMeter.value !== ""
        ? Number.parseInt(purchasePricePerMeter.value)
        : undefined;

    project.landPrice =
      landPrice?.value && landPrice.value !== ""
        ? Number.parseInt(landPrice.value)
        : undefined;

    project.otherCosts =
      otherCosts?.value && otherCosts.value !== ""
        ? Number.parseInt(otherCosts.value)
        : 0;
  };

  /**
   * Creates {@link Text} using given {@param title} to reperesent a heading text.
   * @param title - Title of heading text.
   * @returns react element
   */
  function renderHeading(title: string): React.ReactElement {
    return (
      <Text fontSize="0.7rem" color="gray.600" mb="8px">
        {title}
      </Text>
    );
  }

  return (
    <Box>
      <form onSubmit={submit}>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(12, 1fr)"
          gap={2}
        >
          <GridItem colSpan={6} rowSpan={1}>
            {renderHeading("متراژ زمین")}
            <Input
              id="landSize"
              placeholder="متر"
              defaultValue={project?.landSize}
              type={"number"}
              inputMode={"decimal"}
              min={"0"}
              step={".01"}
            />
          </GridItem>
          <GridItem colSpan={6} rowSpan={1}>
            {renderHeading("درصد تراکم")}
            <Input
              id="densityPercentage"
              placeholder="درصد"
              defaultValue={project?.densityPercentage}
              type={"number"}
              inputMode={"decimal"}
              min={"0"}
              step={".01"}
            />
          </GridItem>
          <GridItem colSpan={4} rowSpan={1}>
            {renderHeading("تعداد طبقات")}
            <Input
              id="floorCount"
              placeholder="تعداد"
              defaultValue={project?.floorCount}
              type={"number"}
              inputMode={"numeric"}
              min={"0"}
            />
          </GridItem>
          <GridItem colSpan={4} rowSpan={1}>
            {renderHeading("تعداد انباری")}
            <Input
              id="warehouseCount"
              placeholder="تعداد"
              defaultValue={project?.warehouseCount}
              type={"number"}
              inputMode={"numeric"}
              min={"0"}
            />
          </GridItem>
          <GridItem colSpan={4} rowSpan={1}>
            {renderHeading("متراژ هر انباری")}
            <Input
              id="warehouseArea"
              placeholder="متر"
              defaultValue={project?.warehouseArea}
              type={"number"}
              inputMode={"decimal"}
              min={"0"}
              step={".01"}
            />
          </GridItem>
          <GridItem colSpan={6} rowSpan={1}>
            {renderHeading("هزینه ساخت هر متر")}
            <Input
              id="buildCostPerMeter"
              placeholder="تومان"
              defaultValue={project?.buildCostPerMeter}
              type={"number"}
              inputMode={"numeric"}
              min={"0"}
            />
          </GridItem>
          <GridItem colSpan={6} rowSpan={1}>
            {renderHeading("قیمت فروش هر متر")}
            <Input
              id="salesPricePerMeter"
              placeholder="تومان"
              defaultValue={project?.salesPricePerMeter}
              type={"number"}
              inputMode={"numeric"}
              min={"0"}
            />
          </GridItem>
          <GridItem colSpan={6} rowSpan={1}>
            {renderHeading("متراژ خلاف هر طبقه")}
            <Input
              id="delictArea"
              placeholder="متر"
              defaultValue={project?.delictArea}
              type={"number"}
              inputMode={"decimal"}
              min={"0"}
              step={".01"}
            />
          </GridItem>
          <GridItem colSpan={6} rowSpan={1}>
            {renderHeading("هزینه هر متر خلاف")}
            <Input
              id="delictPenaltyPerMeter"
              placeholder="تومان"
              defaultValue={project?.delictPenaltyPerMeter}
              type={"number"}
              inputMode={"numeric"}
              min={"0"}
            />
          </GridItem>
          <GridItem colSpan={6} rowSpan={1}>
            {renderHeading("درصد مشارکت سازنده")}
            <Input
              id="builderPercentage"
              placeholder="درصد"
              defaultValue={project?.builderPercentage}
              type={"number"}
              inputMode={"decimal"}
              min={"0"}
              step={".01"}
            />
          </GridItem>
          <GridItem colSpan={6} rowSpan={1}>
            {renderHeading("اُوِر")}
            <Input
              id="over"
              placeholder="تومان"
              defaultValue={project?.over}
              type={"number"}
              inputMode={"numeric"}
              min={"0"}
            />
          </GridItem>
          <GridItem colSpan={5} rowSpan={1}>
            {renderHeading("قیمت خرید هر متر زمین")}
            <Input
              id="purchasePricePerMeter"
              placeholder="تومان"
              defaultValue={project?.purchasePricePerMeter}
              type={"number"}
              inputMode={"numeric"}
              min={"0"}
            />
          </GridItem>
          <GridItem colSpan={2} rowSpan={1} position="relative">
            <Center h="100%">
              <Text
                color="gray.300"
                fontSize="sm"
                position="absolute"
                bottom="0"
              >
                یا
              </Text>
            </Center>
          </GridItem>
          <GridItem colSpan={5} rowSpan={1}>
            {renderHeading("قیمت کل زمین")}
            <Input
              id="landPrice"
              placeholder="تومان"
              defaultValue={project?.landPrice}
              type={"number"}
              inputMode={"numeric"}
              min={"0"}
            />
          </GridItem>
          <GridItem colSpan={12} rowSpan={1}>
            {renderHeading("سایر هزینه‌ها")}
            <Input
              id="otherCosts"
              placeholder="تومان"
              defaultValue={project?.otherCosts}
              type={"number"}
              inputMode={"numeric"}
              min={"0"}
            />
          </GridItem>

          {/* Buttons */}
          <GridItem colSpan={6} rowSpan={1}>
            <Button
              className="blackButton"
              leftIcon={<Icon as={BsCalculatorFill} w={5} h={5} />}
              variant="solid"
              w="100%"
              type="submit"
            >
              محاسبه
            </Button>
          </GridItem>
          <GridItem colSpan={6} rowSpan={1}>
            <Button
              className="blackButton"
              leftIcon={<Icon as={BsFillSave2Fill} w={5} h={5} />}
              variant="solid"
              w="100%"
              onClick={(e) => save(e)}
            >
              ذخیره
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
};

export default ProjectForm;
