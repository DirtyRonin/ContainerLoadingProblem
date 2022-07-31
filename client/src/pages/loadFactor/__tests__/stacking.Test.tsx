import { Cargo, ICargo, IContainer } from "../../../models";
import { IStacking, Stacking } from "../Stacking";
import {testCargo, testContainer,testGoods} from '../../../utils/index'


describe("calculating stacking factor", () => {
    let container: IContainer;
    let cargo: ICargo;

    beforeEach(() => {
      container = testContainer.StandardTruck;
    });

    afterEach(() => {
      container = testContainer.AsInitializeDefault;
      cargo = testCargo.AsInitializeDefault;
    });

    it("stacking factor should be 1 and rest height should be 0 when 'isStackable' is set to false", () => {
      cargo = testCargo.AsInitializeDefault;

      const result = Stacking.CalculateStackingFactor(cargo, container.height);
      expect(result).toEqual<IStacking>({ stackingFactor: 1, remainingHeight: 0 });
    });

    it("stacking factor should be 3 and rest height should be 30 when 'isStackable' is set to true and height of the cargo is 80", () => {
      cargo = new Cargo(testGoods.l100w120h80, 3, true);

      const result = Stacking.CalculateStackingFactor(cargo, container.height);
      expect(result).toEqual<IStacking>({ stackingFactor: 3, remainingHeight: 30 });
    });
  });