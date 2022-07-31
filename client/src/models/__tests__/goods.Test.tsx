import { testGoods } from "../../utils";

describe("Testing Goods Class Functions", () => {
  describe("calculating Area of a single goods", () => {
    let singleGoods;

    beforeEach(() => {});

    afterEach(() => {
      singleGoods = testGoods.AsInitializeDefault;
    });

    it("the area should be 12000 for a single goods of the type 'l100w120h80'", () => {
      singleGoods = testGoods.l100w120h80;

      const result = singleGoods.GetArea();
      expect(result).toEqual(12000);
    });
  });
});
