import Project from "@/models/Project";

class Calculator {
  static calculate(project: Project): Project {
    // Calculating total area available to build
    let areaAvailableToBuild: number = project.landSize ?? 0;

    // Calculating area of each floor based on density
    var eachFloorArea: number =
      (areaAvailableToBuild * (project.densityPercentage ?? 0)) / 100;

    // Adding delict area for each floor (which is equal for all floors)
    eachFloorArea += project.delictArea ?? 0;

    // Calculating total area to build
    let totalAreaToBuild: number = eachFloorArea * (project.floorCount ?? 0);

    // Calculating build cost
    var buildCost: number = totalAreaToBuild * (project.buildCostPerMeter ?? 0);

    // Add delict area penalty cost to the build cost
    buildCost +=
      (project.delictArea ?? 0) *
      (project.delictPenaltyPerMeter ?? 0) *
      (project.floorCount ?? 0);

    // Calculate available area to sell (including warehouses)
    let totalAreaToSell: number =
      totalAreaToBuild +
      (project.warehouseCount ?? 0) * (project.warehouseArea ?? 0);

    // Calculating total value of the property
    let totalValueOfProperty: number =
      totalAreaToSell * (project.salesPricePerMeter ?? 0);

    // Calculating builder share of area
    let builderShareOfArea: number =
      project.builderPercentage !== undefined
        ? (totalAreaToSell * (project.builderPercentage ?? 1.0)) / 100
        : totalAreaToSell;

    // Calculate land price from land size and purchase price per meter if available
    if (project.purchasePricePerMeter !== undefined) {
      project.landPrice =
        (project.purchasePricePerMeter ?? 0) * (project.landSize ?? 0);
    } else if (project.landPrice !== undefined) {
      project.purchasePricePerMeter =
        (project.landPrice ?? 0) / (project.landSize ?? 0);
    }

    // Calculating total cost in case of purchase and/or participation
    let totalCostInCaseOfPurchase: number =
      project.landPrice !== undefined
        ? buildCost + (project.landPrice ?? 0) + (project.otherCosts ?? 0)
        : 0;

    let totalCostInCaseOfParticipation: number =
      project.builderPercentage !== undefined
        ? buildCost + (project.over ?? 0) + (project.otherCosts ?? 0)
        : 0;

    // Calculating profits in case of purchase and/or participation
    let profitInCaseOfPurchase: number =
      project.landPrice !== undefined
        ? totalValueOfProperty - totalCostInCaseOfPurchase
        : 0;

    let profitInCaseOfParticipation: number =
      project.builderPercentage !== undefined
        ? builderShareOfArea * (project.salesPricePerMeter ?? 0) -
          totalCostInCaseOfParticipation
        : 0;

    // Update model with final calculations
    project.eachFloorLegalAreaToBuild = Number.parseFloat(
      (eachFloorArea - (project.delictArea ?? 0)).toFixed(2)
    );
    project.eachFloorAreaToBuild = Number.parseFloat(
      (eachFloorArea + (project.warehouseArea ?? 0)).toFixed(2)
    );
    project.maximumParkingCount = Number.parseFloat(
      ((project.eachFloorLegalAreaToBuild ?? 0) / 25).toFixed(0)
    );
    project.totalAreaToBuild = Number.parseFloat(
      String(totalAreaToBuild.toFixed(2))
    );
    project.totalAreaToSell = Number.parseFloat(totalAreaToSell.toFixed(2));
    project.totalCostInCaseOfParticipation = Number.parseInt(
      String(totalCostInCaseOfParticipation)
    );
    project.totalCostInCaseOfPurchase = Number.parseInt(
      String(totalCostInCaseOfPurchase)
    );
    project.totalValueOfProperty = Number.parseInt(
      String(totalValueOfProperty)
    );
    project.builderShareOfArea = Number.parseFloat(
      builderShareOfArea.toFixed(2)
    );
    project.buildCost = Number.parseInt(String(buildCost));
    project.builderProfitInCaseOfPurchase = Number.parseInt(
      String(profitInCaseOfPurchase)
    );
    project.builderProfitInCaseOfParticipation = Number.parseInt(
      String(profitInCaseOfParticipation)
    );

    return project;
  }

  static clear(project: Project): Project {
    project.title = undefined;
    project.time = Date.parse(Date());

    project.landSize = undefined;
    project.buildCostPerMeter = undefined;
    project.salesPricePerMeter = undefined;
    project.floorCount = undefined;
    project.densityPercentage = undefined;
    project.warehouseCount = undefined;
    project.warehouseArea = undefined;
    project.delictArea = 0;
    project.delictPenaltyPerMeter = 0;
    project.landPrice = undefined;
    project.purchasePricePerMeter = undefined;
    project.builderPercentage = undefined;
    project.over = undefined;
    project.otherCosts = 0;

    project.eachFloorLegalAreaToBuild = undefined;
    project.eachFloorAreaToBuild = undefined;
    project.maximumParkingCount = undefined;
    project.totalAreaToBuild = undefined;
    project.totalAreaToSell = undefined;
    project.totalCostInCaseOfParticipation = undefined;
    project.totalCostInCaseOfPurchase = undefined;
    project.totalValueOfProperty = undefined;
    project.builderShareOfArea = undefined;
    project.buildCost = undefined;
    project.builderProfitInCaseOfPurchase = undefined;
    project.builderProfitInCaseOfParticipation = undefined;

    return project;
  }
}

export default Calculator;
