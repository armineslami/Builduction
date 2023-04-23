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
  const inputLandSize = useRef<HTMLInputElement>(null);
  const inputDensityPercentage = useRef<HTMLInputElement>(null);
  const inputFloorCount = useRef<HTMLInputElement>(null);
  const inputWarehouseCount = useRef<HTMLInputElement>(null);
  const inputWarehouseArea = useRef<HTMLInputElement>(null);
  const inputBuildCostPerMeter = useRef<HTMLInputElement>(null);
  const inputSalesPricePerMeter = useRef<HTMLInputElement>(null);
  const inputDelictArea = useRef<HTMLInputElement>(null);
  const inputDelictPenaltyPerMeter = useRef<HTMLInputElement>(null);
  const inputBuilderPercentage = useRef<HTMLInputElement>(null);
  const inputOver = useRef<HTMLInputElement>(null);
  const inputPurchasePricePerMeter = useRef<HTMLInputElement>(null);
  const inputLandPrice = useRef<HTMLInputElement>(null);
  const inputOtherCosts = useRef<HTMLInputElement>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    readInputs();
    onCalculate(project);
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    readInputs();
    onSave(project);
  };

  /**
   * Reads value of form inputs and set them to the {@link project}.
   */
  const readInputs = () => {
    project.landSize =
      inputLandSize.current?.value && inputLandSize.current.value !== ""
        ? Number.parseFloat(inputLandSize.current.value)
        : undefined;

    project.densityPercentage =
      inputDensityPercentage.current?.value &&
      inputDensityPercentage.current.value !== ""
        ? Number.parseFloat(inputDensityPercentage.current.value)
        : undefined;

    project.floorCount =
      inputFloorCount.current?.value && inputFloorCount.current.value !== ""
        ? Number.parseInt(inputFloorCount.current.value)
        : undefined;

    project.warehouseCount =
      inputWarehouseCount.current?.value &&
      inputWarehouseCount.current.value !== ""
        ? Number.parseInt(inputWarehouseCount.current.value)
        : undefined;

    project.warehouseArea =
      inputWarehouseArea.current?.value &&
      inputWarehouseArea.current.value !== ""
        ? Number.parseFloat(inputWarehouseArea.current.value)
        : undefined;

    project.buildCostPerMeter =
      inputBuildCostPerMeter.current?.value &&
      inputBuildCostPerMeter.current.value !== ""
        ? Number.parseInt(inputBuildCostPerMeter.current.value)
        : undefined;

    project.salesPricePerMeter =
      inputSalesPricePerMeter.current?.value &&
      inputSalesPricePerMeter.current.value !== ""
        ? Number.parseInt(inputSalesPricePerMeter.current.value)
        : undefined;

    project.delictArea =
      inputDelictArea.current?.value && inputDelictArea.current.value !== ""
        ? Number.parseFloat(inputDelictArea.current.value)
        : 0;

    project.delictPenaltyPerMeter =
      inputDelictPenaltyPerMeter.current &&
      inputDelictPenaltyPerMeter.current.value !== ""
        ? Number.parseInt(inputDelictPenaltyPerMeter.current.value)
        : 0;

    project.builderPercentage =
      inputBuilderPercentage.current?.value &&
      inputBuilderPercentage.current.value !== ""
        ? Number.parseFloat(inputBuilderPercentage.current.value)
        : undefined;

    project.over =
      inputOver.current?.value && inputOver.current.value !== ""
        ? Number.parseFloat(inputOver.current.value)
        : undefined;

    project.purchasePricePerMeter =
      inputPurchasePricePerMeter.current &&
      inputPurchasePricePerMeter.current.value !== ""
        ? Number.parseInt(inputPurchasePricePerMeter.current.value)
        : undefined;

    project.landPrice =
      inputLandPrice.current?.value && inputLandPrice.current.value !== ""
        ? Number.parseInt(inputLandPrice.current.value)
        : undefined;

    project.otherCosts =
      inputOtherCosts.current?.value && inputOtherCosts.current.value !== ""
        ? Number.parseInt(inputOtherCosts.current.value)
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
              ref={inputLandSize}
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
              ref={inputDensityPercentage}
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
              ref={inputFloorCount}
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
              ref={inputWarehouseCount}
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
              ref={inputWarehouseArea}
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
              ref={inputBuildCostPerMeter}
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
              ref={inputSalesPricePerMeter}
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
              ref={inputDelictArea}
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
              ref={inputDelictPenaltyPerMeter}
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
              ref={inputBuilderPercentage}
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
              ref={inputOver}
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
              ref={inputPurchasePricePerMeter}
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
              ref={inputLandPrice}
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
              ref={inputOtherCosts}
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
