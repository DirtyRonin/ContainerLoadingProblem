import { Cargo, ICargo, ITruck, Truck } from "../../../models/index";
import { ILoadingMeter, LoadingMeter } from "../LoadingMeter";
import { testContainer, testGoods } from "../../../utils/index";
import { IMathHelper, MathHelper } from "../../../utils/mathHelper/mathHelper";

describe("calculating the loading meter", () => {

  const mathHelper:IMathHelper = new MathHelper()
  const loadingMeter: ILoadingMeter = new LoadingMeter(mathHelper);

  let truck: ITruck;
  let cargo: ICargo[];

  beforeEach(() => {
    truck = testContainer.StandardTruck;
  });

  afterEach(() => {
    truck = testContainer.AsInitializeDefault;
    cargo = [];
  });

  it("should be 0.5 loading meter for the quantity of one piece of 'l100w120h80'", () => {
    cargo = [new Cargo(testGoods.l100w120h80, 1, false)];

    const result = loadingMeter.CalculateLoadingMeter(cargo, truck);
    expect(result).toEqual(50);
  });

  it("should be 1.0 loading meter for the quantity of two pieces of 'l100w120h80' next to each other in the same row", () => {
    cargo = [new Cargo(testGoods.l100w120h80, 2, false)];

    const result = loadingMeter.CalculateLoadingMeter(cargo, truck);
    expect(result).toEqual(100);
  });

  it("should be 1.0 loading meter for the quantity of two pieces of 'l100w120h80' next to each other in the same row even isStackable is true", () => {
    cargo = [new Cargo(testGoods.l100w120h80, 2, true)];

    const result = loadingMeter.CalculateLoadingMeter(cargo, truck);
    expect(result).toEqual(100);
  });

  it("should be 0.5 loading meter for three pieces of 'l100w120h80' stacked on each other", () => {
    cargo = [new Cargo(testGoods.l100w120h80, 3, true)];

    const result = loadingMeter.CalculateLoadingMeter(cargo, truck);
    expect(result).toEqual(100);
  });

  it("should be 1 loading meter for four pieces of 'l100w120h80' stacked on and next to each other", () => {
    cargo = [new Cargo(testGoods.l100w120h80, 4, true)];

    const result = loadingMeter.CalculateLoadingMeter(cargo, truck);
    expect(result).toEqual(100);
  });

  describe("calculating examples", () => {
    it("should be 320 with 16 pieces", () => {
      cargo = [new Cargo(testGoods.l80w120h120, 16, true)];

      const result = loadingMeter.CalculateLoadingMeter(cargo, truck);
      expect(result).toEqual(320);
    });
    it("should be 320 with 14 pieces", () => {
      cargo = [new Cargo(testGoods.l80w120h120, 14, true)];

      const result = loadingMeter.CalculateLoadingMeter(cargo, truck);
      expect(result).toEqual(320);
    });

    it("should be 160", () => {
      cargo = [new Cargo(testGoods.l160w120h80, 6, true)];

      const result = loadingMeter.CalculateLoadingMeter(cargo, truck);
      expect(result).toEqual(160);
    });
  });
});

describe("Testing Truck Functions", () => {
  describe("adding weight of trucks", () => {

    const mathHelper:IMathHelper = new MathHelper()
    const loadingMeter: ILoadingMeter = new LoadingMeter(mathHelper);

    let trucks: ITruck[] = [];

    beforeEach(() => {
      trucks.push(
        new Truck(0, "1", 400, 200, 700, 15000, 600, 300),
        new Truck(0, "2", 200, 150, 500, 5000, 300, 100),
        new Truck(0, "3", 200, 150, 500, 5000, 300, 100)
      );
    });

    afterEach(() => {
      trucks = [];
    });

    it("maxWeight should be 20000", () => {
      const result = loadingMeter.AddTrucksUp(trucks[0], trucks[1]);
      expect(result.maxWeight).toEqual(20000);
    });

    it("maxWeight should be 25000", () => {
      const result = trucks.reduce((prev, cur) =>
      loadingMeter.AddTrucksUp(prev, cur)
      );
      expect(result.maxWeight).toEqual(25000);
    });
  });
});
