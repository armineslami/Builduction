import { v4 as uuid_v4 } from "uuid";

class Project {
  id: string;
  title?: string;
  time?: number;

  landSize?: number;
  buildCostPerMeter?: number;
  salesPricePerMeter?: number;
  floorCount?: number;
  floorUnitCount?: number;

  densityPercentage?: number;
  warehouseCount?: number;
  warehouseArea?: number;
  delictArea?: number;
  delictPenaltyPerMeter?: number;
  // withdrawalArea?: number;
  landPrice?: number;
  purchasePricePerMeter?: number;
  builderPercentage?: number;
  over?: number;
  otherCosts?: number;

  eachFloorLegalAreaToBuild?: number;
  eachUnitLegalAreaToBuild?: number;
  eachFloorAreaToBuild?: number;
  eachUnitAreaToBuild?: number;
  maximumParkingCount?: number;
  totalAreaToBuild?: number;
  totalAreaToSell?: number;
  totalCostInCaseOfParticipation?: number;
  totalCostInCaseOfPurchase?: number;
  totalValueOfProperty?: number;
  builderShareOfArea?: number;
  buildCost?: number;
  builderProfitInCaseOfPurchase?: number;
  builderProfitInCaseOfParticipation?: number;

  constructor() {
    this.id = uuid_v4();
    this.title = undefined;
    this.time = Date.parse(Date());

    this.landSize = undefined;
    this.buildCostPerMeter = undefined;
    this.salesPricePerMeter = undefined;
    this.floorCount = undefined;
    this.floorUnitCount = 1;
    this.densityPercentage = undefined;
    this.warehouseCount = undefined;
    this.warehouseArea = undefined;
    this.delictArea = 0;
    this.delictPenaltyPerMeter = 0;
    this.landPrice = undefined;
    this.purchasePricePerMeter = undefined;
    this.builderPercentage = undefined;
    this.over = undefined;
    this.otherCosts = 0;

    this.eachFloorLegalAreaToBuild = undefined;
    this.eachUnitLegalAreaToBuild = undefined;
    this.eachFloorAreaToBuild = undefined;
    this.eachUnitAreaToBuild = undefined;
    this.maximumParkingCount = undefined;
    this.totalAreaToBuild = undefined;
    this.totalAreaToSell = undefined;
    this.totalCostInCaseOfParticipation = undefined;
    this.totalCostInCaseOfPurchase = undefined;
    this.totalValueOfProperty = undefined;
    this.builderShareOfArea = undefined;
    this.buildCost = undefined;
    this.builderProfitInCaseOfPurchase = undefined;
    this.builderProfitInCaseOfParticipation = undefined;
  }
}

export default Project;
