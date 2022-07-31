import { IMathHelper, MathHelper } from "../mathHelper";
import { testGoods } from "../../testing/testHelper";
import { IContainer } from "../../../models";

describe("Testing Math Helper", () => {
  describe("Testing GetAreaRectangle", () => {
    let helper: IMathHelper;

    beforeAll(() => {
      helper = new MathHelper();
    });

    afterAll(() => {
      helper = {} as IMathHelper;
    });

    it("the area for a container of type 'l100w120h80' should be 12000", () => {
      const container: IContainer = testGoods.l100w120h80;
      const result = helper.GetAreaRectangle(container);
      expect(result).toEqual(12000);
    });
  });
});
