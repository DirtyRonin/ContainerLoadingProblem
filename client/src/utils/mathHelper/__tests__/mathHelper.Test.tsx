import { MathHelper } from '../MathHelper';
import { testHelper } from '../../testing/testHelper';
import { ICargo, IContainer, IMathHelper } from '../../../interfaces';
import { Cargo, Container } from '../../../models';

describe('Testing Math Helper', () => {
  let _helper: IMathHelper;

  const _testContainers = testHelper.testContainers;
  const _testCargos = testHelper.testCargos;

  let _container: IContainer;
  let _cargo: ICargo;

  beforeAll(() => {
    _helper = new MathHelper();
  });

  afterAll(() => {
    _helper = {} as IMathHelper;
  });

  describe('Testing GetAreaRectangle', () => {
    afterEach(() => {
      _container ={} as IContainer;
      _cargo = {} as ICargo;
    });

    it("the area for a container of type 'l100w120h80' should be 12000", () => {
      _container = _testContainers.box_l100w120h80;
      const result = _helper.GetAreaRectangle(_container);
      expect(result).toEqual(12000);
    });
  });

  describe('Testing IsFitting', () => {
    describe('validating if a cargo fits into a container', () => {
      describe('focusing on the length', () => {
        
        afterEach(() => {
          _container ={} as IContainer;
          _cargo = {} as ICargo;
        });

        it("one piece of 'oversized_box_l1500w120h80' should be FALSE for a container of type 'Truck_l1360w240h270' .", () => {
          _container = _testContainers.Truck_l1360w240h270;
          _cargo = new Cargo(_testContainers.oversized_box_l1500w120h80, 1, false);

          const result = _helper.IsFitting(_container, _cargo);
          expect(result).toEqual(false);
        });
        it("a cargo of same length should be TRUE for a container of type 'Truck_l1360w240h270' .", () => {
          _container = _testContainers.Truck_l1360w240h270;
          _cargo = new Cargo(new Container(1360,240,270), 1, false);

          const result = _helper.IsFitting(_container, _cargo);
          expect(result).toEqual(true);
        });
      });

      describe('focusing on the width', () => {

        afterEach(() => {
          _container ={} as IContainer;
          _cargo = {} as ICargo;
        });

        it("one piece of 'oversized_box_l120w1600h80' should be FALSE for a container of type 'Truck_l1360w240h270' .", () => {
          _container = _testContainers.Truck_l1360w240h270;
          _cargo = new Cargo(_testContainers.oversized_box_l120w1600h80, 1, false);

          const result = _helper.IsFitting(_container, _cargo);
          expect(result).toEqual(false);
        });
        it("a cargo of same width should be TRUE for a container of type 'Truck_l1360w240h270' .", () => {
          _cargo = new Cargo(new Container(120,240,270), 1, false);

          const result = _helper.IsFitting(_container, _cargo);
          expect(result).toEqual(true);
        });
      });

      describe('focusing on the height', () => {
        afterEach(() => {
          _container = _testContainers.AsInitializeDefault;
          _cargo = _testCargos.AsInitializeDefault;
        });

        it("one piece of 'oversized_box_l120w120h1700' should be FALSE for a container of type 'Truck_l1360w240h270' .", () => {
          _container = _testContainers.Truck_l1360w240h270;
          _cargo = new Cargo(_testContainers.oversized_box_l120w120h1700, 1, false);

          const result = _helper.IsFitting(_container, _cargo);
          expect(result).toEqual(false);
        });

        it("a cargo of same height should be TRUE for a container of type 'Truck_l1360w240h270' .", () => {
          _container = _testContainers.Truck_l1360w240h270;
          _cargo = new Cargo(new Container(120,60,270), 1, false);

          const result = _helper.IsFitting(_container, _cargo);
          expect(result).toEqual(true);
        });
      });

      describe('focusing on swapping width and length', () => {

        afterEach(() => {
          _container ={} as IContainer;
          _cargo = {} as ICargo;
        });

        it("a cargo with greater length should return TRUE if cargo length is smaller than or equal to the container width of type 'box_l100w120h80' .", () => {
          _container = _testContainers.box_l100w120h80;
          _cargo = new Cargo(new Container(120,60,60), 1, false);

          console.log(_cargo.singleGoods, _container);

          const result = _helper.IsFitting(_container, _cargo);
          expect(result).toEqual(true);
        });
      });
    });
  });

  // describe("adding weight of trucks", () => {
  //   const mathHelper: IMathHelper = new MathHelper();

  //   let trucks: IContainer[] = [];

  //   beforeEach(() => {
  //     trucks.push(
  //       new Truck(0, "1", 400, 200, 700, 15000, 600, 300, mathHelper),
  //       new Truck(0, "2", 200, 150, 500, 5000, 300, 100, mathHelper),
  //       new Truck(0, "3", 200, 150, 500, 5000, 300, 100, mathHelper)
  //     );
  //   });

  //   afterEach(() => {
  //     trucks = [];
  //   });

  //   it("maxWeight should be 20000", () => {
  //     const result = mathHelper.AddContainersUp(trucks[0], trucks[1]);
  //     expect(result.maxWeight).toEqual(20000);
  //   });

  //   it("maxWeight should be 25000", () => {
  //     const result = trucks.reduce((prev, cur) =>
  //     mathHelper.AddTrucksUp(prev, cur)
  //     );
  //     expect(result.maxWeight).toEqual(25000);
  //   });
  // });
});
