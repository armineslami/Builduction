/// <reference types="cypress" />

import Calculator from "../../../src/models/Calculator";
import Project from "../../../src/models/Project";

describe("Calculator", () => {
  let calculatedProject = undefined;
  let project = new Project();
  beforeEach(() => {
    project.landSize = 200;
    project.densityPercentage = 60;
    project.floorCount = 5;
    project.warehouseCount = 5;
    project.warehouseArea = 5;
    project.buildCostPerMeter = 10000000;
    project.salesPricePerMeter = 30000000;
    project.delictArea = 10;
    project.delictPenaltyPerMeter = 3000000;
    project.builderPercentage = 50;
    project.over = 1000000000;
    project.purchasePricePerMeter = 25000000;
    project.otherCosts = 500000000;
    calculatedProject = Calculator.calculate(project);
  });

  it("should have correct legal area to build for each floor", () => {
    let area = (project.landSize * 60) / 100;
    expect(calculatedProject.eachFloorLegalAreaToBuild).to.be.equal(area);
  });

  it("should have correct area for each unit including delict area", () => {
    let area = (project.landSize * 60) / 100;
    area += project.warehouseArea;
    area += project.delictArea;
    expect(calculatedProject.eachFloorAreaToBuild).to.be.equal(area);
  });

  it("should have correct area to build for the whole building", () => {
    let area = (project.landSize * 60) / 100;
    area += project.delictArea;
    area *= project.floorCount;
    expect(calculatedProject.totalAreaToBuild).to.be.equal(area);
  });

  it("should have correct area to sell for the whole property", () => {
    let area = (project.landSize * 60) / 100;
    area += project.delictArea;
    area *= project.floorCount;
    area += project.warehouseArea * project.warehouseCount;
    expect(calculatedProject.totalAreaToSell).to.be.equal(area);
  });

  it("should have correct parking count", () => {
    const area = (project.landSize * 60) / 100;
    const count = Number.parseFloat(area / 25).toFixed(0);
    expect(project.maximumParkingCount).to.be.equal(Number(count));
  });

  it("should have correct parking count", () => {
    const area = (project.landSize * 60) / 100;
    const count = Number.parseFloat(area / 25).toFixed(0);
    expect(project.maximumParkingCount).to.be.equal(Number(count));
  });

  it("should have correct cost for purchasing the land and building it", () => {
    let area = (project.landSize * 60) / 100;
    area += project.delictArea;
    area *= project.floorCount;
    const buildCost = area * project.buildCostPerMeter;
    let cost =
      buildCost +
      project.landPrice +
      project.otherCosts +
      project.delictArea * project.delictPenaltyPerMeter * project.floorCount;
    expect(project.totalCostInCaseOfPurchase).to.be.equal(cost);
  });

  it("should have correct cost for participating", () => {
    let area = (project.landSize * 60) / 100;
    area += project.delictArea;
    area *= project.floorCount;
    const buildCost = area * project.buildCostPerMeter;
    let cost =
      buildCost +
      project.over +
      project.otherCosts +
      project.delictArea * project.delictPenaltyPerMeter * project.floorCount;
    expect(project.totalCostInCaseOfParticipation).to.be.equal(cost);
  });

  it("should have correct value for the whole property", () => {
    let area = (project.landSize * 60) / 100;
    area += project.delictArea;
    area += project.warehouseArea;
    area *= project.floorCount;
    let totalValue = area * project.salesPricePerMeter;
    expect(project.totalValueOfProperty).to.be.equal(totalValue);
  });

  it("should have correct value for builder's share of area", () => {
    let area = (project.landSize * 60) / 100;
    area += project.delictArea;
    area *= project.floorCount;
    area += project.warehouseArea * project.warehouseCount;
    const builderShare = (area * project.builderPercentage) / 100;
    expect(project.builderShareOfArea).to.be.equal(builderShare);
  });

  it("should have correct value for buildCost", () => {
    let area = (project.landSize * 60) / 100;
    area += project.delictArea;
    area *= project.floorCount;
    let buildCost = area * project.buildCostPerMeter;
    buildCost +=
      project.delictArea * project.delictPenaltyPerMeter * project.floorCount;
    expect(project.buildCost).to.be.equal(buildCost);
  });

  it("should have correct value for builder profit for purchase case", () => {
    let area = (project.landSize * 60) / 100;
    area += project.delictArea;
    area *= project.floorCount;
    let buildCost = area * project.buildCostPerMeter;
    buildCost +=
      project.delictArea * project.delictPenaltyPerMeter * project.floorCount;
    let cost = buildCost + project.landPrice + project.otherCosts;

    area += project.warehouseArea * project.warehouseCount;
    let totalValue = area * project.salesPricePerMeter;

    expect(project.builderProfitInCaseOfPurchase).to.be.equal(
      totalValue - cost
    );
  });

  it("should have correct value for builder profit for participating case", () => {
    let area = (project.landSize * 60) / 100;
    area += project.delictArea;
    area *= project.floorCount;
    const buildCost = area * project.buildCostPerMeter;
    let cost =
      buildCost +
      project.over +
      project.otherCosts +
      project.delictArea * project.delictPenaltyPerMeter * project.floorCount;

    area += project.warehouseArea * project.warehouseCount;

    const builderShare = (area * project.builderPercentage) / 100;
    expect(project.builderProfitInCaseOfParticipation).to.be.equal(
      builderShare * project.salesPricePerMeter - cost
    );
  });
});
