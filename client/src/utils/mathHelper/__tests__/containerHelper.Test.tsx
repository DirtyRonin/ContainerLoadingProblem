import '@abraham/reflection'
import { myContainer } from '../../../inversify.config';

import { testHelper } from '../../testing/testHelper';
import { ICargo, IContainer, IArea, IContainerHelper, ILoadSummary, initializeLoadSummary } from '../../../interfaces';
import { Cargo, Container, Goods } from '../../../models';
import { TYPES } from '../../shared/registerSymbols';

describe('Testing Math Helper', () => {
  let _helper: IContainerHelper;

  // TODO: Test CalculateVolumeForRectangle

  const _testContainers = testHelper.testContainers;
  const _testAreas = testHelper.testAreas;

  let _container: IContainer;
  let _cargo: ICargo;
  let _area: IArea;

  beforeAll(() => {
    _helper = myContainer.get<IContainerHelper>(TYPES.ContainerHelper);
  });

  afterAll(() => {
    _helper = {} as IContainerHelper;
  });

  describe('Testing CalculateAreaForRectangle', () => {
    afterAll(() => {
      _container = {} as IContainer;
      _cargo = {} as ICargo;
      _area = {} as IArea;
    });

    it("the area for a container of type 'l100w120h80' should be 12000", () => {
      _area = _testAreas.area_l100w120;
      const result = _helper.CalculateAreaForRectangle(_area);
      expect(result).toEqual(12000);
    });
  });

  describe('Testing IsValidContainer', () => {
    describe('validating that a container needs to fullfill certain requirement', () => {
      afterEach(() => {
        _container = {} as IContainer;
      });

      it('a container with a smaller length than one should return FALSE', () => {
        _container = new Container(0, 120, 60);

        const result = _helper.IsValidContainer(_container);
        expect(result).toEqual(false);
      });
      it('a container with a length that equals or is greater than one should return TRUE', () => {
        _container = new Container(1, 120, 60);

        const result = _helper.IsValidContainer(_container);
        expect(result).toEqual(true);
      });
      it('a container with a smaller width than one should return FALSE', () => {
        _container = new Container(120, 0, 60);

        const result = _helper.IsValidContainer(_container);
        expect(result).toEqual(false);
      });
      it('a container with a width that equals or is greater than one should return TRUE', () => {
        _container = new Container(120, 1, 60);

        const result = _helper.IsValidContainer(_container);
        expect(result).toEqual(true);
      });
      it('a container with a smaller height than one should return FALSE', () => {
        _container = new Container(120, 120, 0);

        const result = _helper.IsValidContainer(_container);
        expect(result).toEqual(false);
      });
      it('a container with a height that equals or is greater than one should return TRUE', () => {
        _container = new Container(120, 120, 1);

        const result = _helper.IsValidContainer(_container);
        expect(result).toEqual(true);
      });
    });
  });

  describe('Testing IsValidCargo', () => {
    describe('validating that a cargo needs to fullfill certain requirement', () => {
      afterEach(() => {
        _cargo = {} as ICargo;
      });

      it('a cargo with a smaller length than one should return FALSE', () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(0, 120), 1, false, 60);

        const result = _helper.IsValidCargo(_cargo);
        expect(result).toEqual(false);
      });
      it('a cargo with a smaller width than one should return FALSE', () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 0), 1, false, 60);

        const result = _helper.IsValidCargo(_cargo);
        expect(result).toEqual(false);
      });
      it('a cargo with a smaller height than one should return FALSE', () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 120), 1, false, 0);

        const result = _helper.IsValidCargo(_cargo);
        expect(result).toEqual(false);
      });
      it('a cargo with a smaller quantity than one should return FALSE', () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 120), 0, false, 60);

        const result = _helper.IsValidCargo(_cargo);
        expect(result).toEqual(false);
      });
    });
  });

  describe('Testing IsFitting', () => {
    describe('validating if a cargo fits into a container', () => {
      beforeEach(() => {
        _container = _testContainers.Truck_l1360w240h270;
      });

      afterEach(() => {
        _container = {} as IContainer;
        _cargo = {} as ICargo;
      });

      it("one piece of of oversized length 'oversized_box_l1500w120h80' should be FALSE for a container of type 'Truck_l1360w240h270' .", () => {
        _cargo = Cargo.WithGoods('', '', _testAreas.oversized_area_l1500w120, 1, false, 80);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(false);
      });
      it("a cargo of same length should be TRUE for a container of type 'Truck_l1360w240h270' .", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(1360, 240), 1, false, 270);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(true);
      });

      it("one piece of of oversized width 'oversized_box_l120w1600h80' should be FALSE for a container of type 'Truck_l1360w240h270' .", () => {
        _cargo = Cargo.WithGoods('', '', _testAreas.oversized_area_l120w1600, 1, false, 80);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(false);
      });
      it("a cargo of same width should be TRUE for a container of type 'Truck_l1360w240h270' .", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 240), 1, false, 270);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(true);
      });

      it("one piece of oversized height 'oversized_box_l120w120h1700' should be FALSE for a container of type 'Truck_l1360w240h270' .", () => {
        _cargo = Cargo.WithGoods('', '', _testAreas.oversized_area_l120w120h, 1, false, 1700);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(false);
      });

      it("a cargo of same height should be TRUE for a container of type 'Truck_l1360w240h270' .", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 60), 1, false, 270);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(true);
      });
    });

    describe('focusing on swapping width and length of the cargo', () => {
      let containerWidth: IContainer;

      beforeEach(() => {
        _container = new Container(100, 120, 80);
        containerWidth = new Container(160, 120, 80);
      });

      afterEach(() => {
        _container = {} as IContainer;
        _cargo = {} as ICargo;
        containerWidth = {} as IContainer;
      });

      // focus length

      it("a cargo with a length of 121 is greater than the container's length and width of type 'box_l100w120h80' and should return FALSE.", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(121, 60), 1, false, 60);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(false);
      });
      it("a cargo with a length of 120 is greater than the container's length and smaller than or equals to the container's width of type 'box_l100w120h80' and should return TRUE.", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 60), 1, false, 60);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(true);
      });
      it("a cargo with a length of 120 and is greater than the container's length and smaller than or equals to the container's width of type 'box_l100w120h80' and should return FALSE, because container's width of 101 is greater than length of the container", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 101), 1, false, 60);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(false);
      });
      it("a cargo with a length of 120 and is greater than the container's length and smaller than or equals to the container's width of type 'box_l100w120h80' and should return TRUE, because container's width of 100 is smaller than or equals to length of the container", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 100), 1, false, 60);

        const result = _helper.IsFitting(_container, _cargo);
        expect(result).toEqual(true);
      });

      // focus width

      it("a cargo with a width of 161 is greater than the container's length and width of type 'box_l160w120h80' and should return FALSE.", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 161), 1, false, 60);

        const result = _helper.IsFitting(containerWidth, _cargo);
        expect(result).toEqual(false);
      });

      it("a cargo with a width of 160 is greater than the container's width and smaller than or equals to the container's length of type 'box_l160w120h80' and should return TRUE.", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 160), 1, false, 60);

        const result = _helper.IsFitting(containerWidth, _cargo);
        expect(result).toEqual(true);
      });

      it("a cargo with a width of 160 and is greater than the container's width and smaller than or equals to the container's length of type 'box_l160w120h80' and should return FALSE, because container's length of 121 is greater than width of the container", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(121, 160), 1, false, 60);

        const result = _helper.IsFitting(containerWidth, _cargo);
        expect(result).toEqual(false);
      });
      it("a cargo with a length of 160 and is greater than the container's width and smaller than or equals to the container's length of type 'box_l160w120h80' and should return TRUE, because container's length of 120 is smaller than or equals to width of the container", () => {
        _cargo = Cargo.WithGoods('', '', Goods.WithValues(120, 160), 1, false, 60);

        const result = _helper.IsFitting(containerWidth, _cargo);
        expect(result).toEqual(true);
      });
    });
  });

  describe('Testing CalculateLoadingMeter', () => {
    describe('calculate the loading meter for a given base ladoing meter, quantity and stacking factor', () => {
      let _baseLoadingMeter: number;

      afterAll(() => {
        _baseLoadingMeter = 0;
      });

      it('for a base loading meter of 50 and the quantity and stacking factor equal to 1 the result should be 50', () => {
        _baseLoadingMeter = 50;

        const result = _helper.CalculateLoadingMeter(_baseLoadingMeter, 1, 1);
        expect(result).toEqual(50);
      });

      it('for a base loading meter of 90, a quantity of 16  and a stacking factror of 2 the result should be 320', () => {
        _baseLoadingMeter = 40;

        const result = _helper.CalculateLoadingMeter(_baseLoadingMeter, 2, 16);
        expect(result).toEqual(320);
      });

      it('This result is correct for the function, but wrong the actual Loading meter. The loading meter should be 320, but the function returns correctly 280.', () => {
        _baseLoadingMeter = 40;

        const result = _helper.CalculateLoadingMeter(_baseLoadingMeter, 2, 14);
        expect(result).toEqual(280);
      });
    });
  });

  describe('Testing CalculateLoadingMeterBase', () => {
    describe('calculate the loading meter for a single goods of cargo within a container', () => {
      let _cargoContainer: IContainer;

      afterAll(() => {
        _cargoContainer = {} as IContainer;
        _container = {} as IContainer;
      });

      it('for a single goods of type "box_l100w120h80" within a container of type "Truck_l1360w240h270" should the result be 50', () => {
        _cargoContainer = new Container(100, 120, 80);
        _container = { ..._testContainers.Truck_l1360w240h270 };

        const result = _helper.CalculateLoadingMeterBase(_cargoContainer, _container);
        expect(result).toEqual(50);
      });

      it('for a single goods of type "box_l80w120h120" within a container of type "Truck_l1360w240h270" should the result be 90', () => {
        _cargoContainer = new Container(80, 120, 120);
        _container = { ..._testContainers.Truck_l1360w240h270 };

        const result = _helper.CalculateLoadingMeterBase(_cargoContainer, _container);
        expect(result).toEqual(40);
      });
    });
  });

  describe('Testing CalculateGoodsPerRow', () => {
    describe('calculates the maximum of goods within a container', () => {
      let goodsWidth: number;
      let containerWidth: number;

      afterEach(() => {
        goodsWidth = 0;
        containerWidth = 0;
      });

      it('goods with a width of 120 should fit two times into a container with a width of 240', () => {
        goodsWidth = 120;
        containerWidth = 240;

        const result = _helper.CalculateGoodsPerRow(goodsWidth, containerWidth);
        expect(result).toEqual(2);
      });

      it('goods with a width of 130 should fit one time into a container with a width of 240', () => {
        goodsWidth = 130;
        containerWidth = 240;

        const result = _helper.CalculateGoodsPerRow(goodsWidth, containerWidth);
        expect(result).toEqual(1);
      });
    });
  });

  describe('Testing CalculateFullStackedRows', () => {
    describe('calculates the maximum of full stacked rows within a container', () => {
      let quantity;
      let goodsPerFullStackedRow;

      afterEach(() => {
        quantity = 0;
        goodsPerFullStackedRow = 0;
      });

      it('2 full stacked rows can be build with 12 pieces with 6 pieces in a full stadcked row', () => {
        quantity = 12;
        goodsPerFullStackedRow = 6;

        const result = _helper.CalculateFullStackedRows(quantity, goodsPerFullStackedRow);
        expect(result).toEqual(2);
      });

      it('2 full stacked rows can be build with 13 pieces with 6 pieces in a full stadcked row', () => {
        quantity = 13;
        goodsPerFullStackedRow = 6;

        const result = _helper.CalculateFullStackedRows(quantity, goodsPerFullStackedRow);
        expect(result).toEqual(2);
      });
    });
  });

  describe('Testing GetMinimumColumns', () => {
    describe('calculates the minimum of columns a certain amout of goods takes within a container.', () => {
      let goodsPerRow: number;
      let remainingGoods: number;

      afterEach(() => {
        goodsPerRow = 0;
        remainingGoods = 0;
      });

      it('For 2 remaining goods the result should be 2', () => {
        goodsPerRow = 3;
        remainingGoods = 2;

        const result = _helper.GetMinimumColumns(goodsPerRow, remainingGoods);
        expect(result).toEqual(2);
      });

      it('For 7 remaining goods the result should be 3', () => {
        goodsPerRow = 3;
        remainingGoods = 7;

        const result = _helper.GetMinimumColumns(goodsPerRow, remainingGoods);
        expect(result).toEqual(3);
      });
    });
  });

  describe('Testing CompareByVolume', () => {
    let _containerA: IContainer;
    let _containerB: IContainer;

    afterAll(() => {
      _containerA = {} as IContainer;
      _containerB = {} as IContainer;
    });

    it('Truck_l1360w240h270 is greater than Truck_l500w240h200 and result should be -1', () => {
      _containerA = _testContainers.Truck_l1360w240h270;
      _containerB = _testContainers.Truck_l500w240h200;

      const result = _helper.CompareByVolume(_containerA, _containerB);
      expect(result).toEqual(-1);
    });
    it('Truck_l500w240h200 is smaller than Truck_l1360w240h270 and result should be 1', () => {
      _containerA = _testContainers.Truck_l500w240h200;
      _containerB = _testContainers.Truck_l1360w240h270;

      const result = _helper.CompareByVolume(_containerA, _containerB);
      expect(result).toEqual(1);
    });
    it('Truck_l500w240h200 is equal than Truck_l500w240h200 and result should be 0', () => {
      _containerA = _testContainers.Truck_l500w240h200;
      _containerB = _testContainers.Truck_l500w240h200;

      const result = _helper.CompareByVolume(_containerA, _containerB);
      expect(result).toEqual(0);
    });

    it('one container of Truck_l1360w240h270 is smaller than five containers of Truck_l500w240h200 and result should be 1', () => {
      _containerA = _testContainers.Truck_l1360w240h270;
      _containerB = _testContainers.Truck_l500w240h200;
      let _multiplierA = 1;
      let _multiplierB = 5;

      const result = _helper.CompareByVolume(_containerA, _containerB, _multiplierA, _multiplierB);
      expect(result).toEqual(1);
    });
  });

  describe('Testing CompareByLoadingMeter', () => {
    let _summaryA: ILoadSummary;
    let _summaryB: ILoadSummary;

    afterAll(() => {
      _summaryA = initializeLoadSummary();
      _summaryB = initializeLoadSummary();
    });

    it('summary B with 60 should be on index 0 in array', () => {
      const comb = [
        { ...initializeLoadSummary(), loadingMeter: 50 },
        { ...initializeLoadSummary(), loadingMeter: 60 },
        { ...initializeLoadSummary(), loadingMeter: 55 },
        { ...initializeLoadSummary(), loadingMeter: 55 },
      ].sort(_helper.CompareByLoadingMeter);

      expect(comb[0].loadingMeter).toEqual(60);
      expect(comb[1].loadingMeter).toEqual(55);
      expect(comb[2].loadingMeter).toEqual(55);
      expect(comb[3].loadingMeter).toEqual(50);
    });
  });

  describe('Testing SortCargos', () => {
    let _cargos: ICargo[];

    afterAll(() => {
      _cargos = [];
    });

    it('Truck_l1360w240h270 is greater than Truck_l500w240h200 and result should be 1', () => {
      const a = Cargo.WithGoods('', '1', Goods.WithValues(100, 120), 1, false, 80);
      const b = Cargo.WithGoods('', '2', Goods.WithValues(80, 120), 1, false, 80);
      const c = Cargo.WithGoods('', '1', Goods.WithValues(80, 120), 2, false, 80);
      const d = Cargo.WithGoods('', '1', Goods.WithValues(100, 140), 1, false, 80);

      _cargos = [a, b, c, d];

      const result = _helper.SortCargos(_cargos);
      expect(result[1][1]).toEqual(d);
      expect(result[1][2]).toEqual(a);
      expect(result[1][0]).toEqual(c);
      expect(result[2][0]).toEqual(b);
    });
  });
});
