import { Cargo } from "../../../models";
import {
  IStacking,
  ICargo,
  IContainer,
  IMathHelper,
} from "../../../interfaces";
import { testHelper } from "../../";
import { MathHelper } from "../index";

describe("calculating stacking factor", () => {

  const _testContainers = testHelper.testContainers;
  const _testCargos = testHelper.testCargos;

  let _container: IContainer;
  let _cargo: ICargo;

  const mathHelper: IMathHelper = new MathHelper();

  beforeEach(() => {
    _container = _testContainers.Truck_l1360w240h270;
  });

  afterEach(() => {
    _container ={} as IContainer;
    _cargo = {} as ICargo;
  });

  it("stacking factor should be 1 and rest height should be 0 when 'isStackable' is set to false", () => {
    _cargo = _testCargos.AsInitializeDefault;

    const result = mathHelper.CalculateStackingFactor(_cargo, _container.height);
    expect(result).toEqual<IStacking>({
      stackingFactor: 1,
      remainingHeight: 0,
    });
  });

  it("stacking factor should be 3 and rest height should be 30 when 'isStackable' is set to true and type of the cargo's container is 'l100w120h80'", () => {
    _cargo = new Cargo(_testContainers.box_l100w120h80, 3, true);

    const result = mathHelper.CalculateStackingFactor(_cargo, _container.height);
    expect(result).toEqual<IStacking>({
      stackingFactor: 3,
      remainingHeight: 30,
    });
  });
});
