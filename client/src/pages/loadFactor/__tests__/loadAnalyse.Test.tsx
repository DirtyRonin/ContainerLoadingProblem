import { ITruck, Truck } from "../../../models/Truck";
import { AddTrucksUp } from "../loadAnalyze";

describe("only Truck Data", () => {
  const trucks: ITruck[] = []; //[Truck.As15er(),Truck.As15er()]

  beforeEach(() => {
    trucks.push(
      new Truck(0, "1", 400, 200, 700, 15000, 600, 300),
      new Truck(0, "2", 200, 150, 500, 5000, 300, 100),
      new Truck(0, "3", 200, 150, 500, 5000, 300, 100)
    );
  });

  afterEach(() => {
    trucks.length = 0;
  });

  test("maxWeight should be 20000", () => {
    const result = AddTrucksUp(trucks[0], trucks[1]);
    expect(result.maxWeight).toEqual(20000);
  });

  test("maxWeight should be 25000", () => {
    const result = trucks.reduce((prev, cur) => AddTrucksUp(prev, cur));
    expect(result.maxWeight).toEqual(25000);
  });
});
