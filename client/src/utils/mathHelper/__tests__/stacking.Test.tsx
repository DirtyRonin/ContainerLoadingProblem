import  '@abraham/reflection';

import { Cargo } from '../../../models';
import { IStacking, ICargo, IContainer, IContainerHelper } from '../../../interfaces';
import { testHelper } from '../../';
import { ContainerHelper } from '../index';

describe('calculating stacking factor', () => {
  const _testContainers = testHelper.testContainers;
  const _testCargos = testHelper.testCargos;
  const _testAreas = testHelper.testAreas;

  let _container: IContainer;
  let _cargo: ICargo;

  const mathHelper: IContainerHelper = new ContainerHelper();

  beforeEach(() => {
    _container = _testContainers.Truck_l1360w240h270;
  });

  afterEach(() => {
    _container = {} as IContainer;
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
    _cargo = Cargo.WithGoods(0, 0, 0, _testAreas.area_l100w120, 3, true, 80);

    const result = mathHelper.CalculateStackingFactor(_cargo, _container.height);
    expect(result).toEqual<IStacking>({
      stackingFactor: 3,
      remainingHeight: 30,
    });
  });
});
