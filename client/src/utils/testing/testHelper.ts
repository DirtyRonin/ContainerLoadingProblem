import { Cargo, Container, Area, Goods, KeyValueLoadSummary } from '../../models';
import { ICargo, IContainer, ILoadAnalyzer, initializeTruck, ITruck } from '../../interfaces';

const testAreas = {
  area_l100w120: Goods.WithValues(100, 120),
  area_l80w120: Goods.WithValues(80, 120),
  area_l160w120: Goods.WithValues(160, 120),
  oversized_area_l1500w120: Goods.WithValues(1500, 120),
  oversized_area_l120w1600: Goods.WithValues(100, 1600),
  oversized_area_l120w120h: Goods.WithValues(100, 120),
};

const testContainers = {
  AsInitializeDefault: initializeTruck(),
  Truck_l1360w240h270: new Container(1360, 240, 270),
  Truck_l500w240h200: new Container(500, 240, 200),
};

type cargoProps = {
  quantity?: number | undefined;
  isStackable?: boolean | undefined;
  height?: number | undefined;
  id?: number | undefined;
  truckId?: number | null | undefined;
};

const testCargos = {
  AsInitializeDefault: Cargo.WithGoods(0, 0, 0, Goods.AsInitializeDefault(), 0, false, 0),
  // area_l100w120: Cargo.WithGoods(0, 0, 0, Goods.WithValues(100, 120), 1, false, 80),
  area_l100w120: () => customCargo({ quantity: 1, isStackable: false, length: 100, width: 120, height: 80, id: 1, truckId: 1 }),
  '1/2euro': ({ quantity = 0, isStackable = false, height = 0, id = 1, truckId = null }: cargoProps) =>
    customCargo({ quantity, isStackable, length: 40, width: 60, height, id, truckId }),
  '1/4euro': ({ quantity = 0, isStackable = false, height = 0, id = 1, truckId = null }: cargoProps) =>
    customCargo({ quantity, isStackable, length: 60, width: 75, height, id, truckId }),
  euro: ({ quantity = 0, isStackable = false, height = 0, id = 1, truckId = null }: cargoProps) =>
    customCargo({ quantity, isStackable, length: 80, width: 120, height, id, truckId }),
  indu: ({ quantity = 0, isStackable = false, height = 0, id = 1, truckId = null }: cargoProps) =>
    customCargo({ quantity, isStackable, length: 100, width: 120, height, id, truckId }),
};

const customCargo = ({
  quantity,
  isStackable,
  height,
  length,
  width,
  id,
  truckId,
}: {
  quantity: number;
  isStackable: boolean;
  height: number;
  length: number;
  width: number;
  id: number;
  truckId: number | null;
}): ICargo => ({
  truckId,
  orderId: 0,
  name: '',
  weight: 0,
  quantity,
  isStackable,
  height,
  length,
  width,
  id,
});

const testTrucks = {
  smallTruck_L420xW180xH170: (id = 1) => customTruck({ length: 420, width: 180, height: 170, id }),
  smallTruck_L500xW240xH200: (id = 1) => customTruck({ length: 500, width: 240, height: 200, id }),
  middleTruck_L620xW245xH240: (id = 1) => customTruck({ length: 620, width: 245, height: 240, id }),
  greatTruck_L1360xW240xH270: (id = 1) => customTruck({ length: 1360, width: 240, height: 270, id }),
};

const customTruck = ({ height, length, width, id }: { height: number; length: number; width: number; id: number }) => ({
  vehicleIdentifier: 'first',
  maxWeight: 0,
  loadingTime: 0,
  dischargeTime: 0,
  height,
  length,
  width,
  id,
});

export const testHelper = {
  testTrucks: { ...testTrucks },
  testContainers: { ...testContainers },
  testCargos: { ...testCargos },
  testAreas: { ...testAreas },
};

type textCase1 = {
  trucks: ITruck[];
  cargos: ICargo[];
  fn: () => void;
  expected: KeyValueLoadSummary[];
};

export const testCase1: textCase1 = {
  trucks: [{ ...testTrucks.smallTruck_L420xW180xH170(1) }, { ...testTrucks.middleTruck_L620xW245xH240(2) }],
  cargos: [
    testCargos.euro({ quantity: 10, isStackable: true, height: 60, id: 1 }),
    testCargos.indu({ quantity: 10, isStackable: true, height: 60, id: 2 }),
    testCargos.euro({ quantity: 33, isStackable: true, height: 30, id: 3 }),
  ],
  /** aligned method */
  fn: () => {
    const stuff: ILoadAnalyzer = {} as ILoadAnalyzer;
    stuff.AnalyzeLoadingForSummaries;

    throw new Error('Just a reminder to get method name');
  },
  expected: [
    {
      key: 2,
      values: [
        {
          cargoId: 1,
          orderId: 0,
          truckId: 2,
          stacking: { stackingFactor: 4, remainingHeight: 0 },
          goodsPerRow: 2,
          goodsPerFullStackedRow: 8,
          fullStackedRows: 1,
          fullStackedGoods: 8,
          loadingMeter: 156.73469387755102,
          loadingMeterBase: 39.183673469387756,
          remainingGoods: 2,
          isValid: true,
        },
        {
          cargoId: 2,
          orderId: 0,
          truckId: 2,
          stacking: { stackingFactor: 4, remainingHeight: 0 },
          goodsPerRow: 2,
          goodsPerFullStackedRow: 8,
          fullStackedRows: 1,
          fullStackedGoods: 8,
          loadingMeter: 195.91836734693877,
          loadingMeterBase: 48.97959183673469,
          remainingGoods: 2,
          isValid: true,
        },
        {
          cargoId: 3,
          orderId: 0,
          truckId: 2,
          stacking: { stackingFactor: 8, remainingHeight: 0 },
          goodsPerRow: 2,
          goodsPerFullStackedRow: 16,
          fullStackedRows: 2,
          fullStackedGoods: 32,
          loadingMeter: 195.9183673469388,
          loadingMeterBase: 39.183673469387756,
          remainingGoods: 1,
          isValid: true,
        },
      ],
    },
    {
      key: 1,
      values: [
        {
          cargoId: 1,
          orderId: 0,
          truckId: 1,
          stacking: { stackingFactor: 2, remainingHeight: 50 },
          goodsPerRow: 1,
          goodsPerFullStackedRow: 2,
          fullStackedRows: 5,
          fullStackedGoods: 10,
          loadingMeter: 266.6666666666667,
          loadingMeterBase: 53.333333333333336,
          remainingGoods: 0,
          isValid: true,
        },
        {
          cargoId: 2,
          orderId: 0,
          truckId: 1,
          stacking: { stackingFactor: 2, remainingHeight: 50 },
          goodsPerRow: 1,
          goodsPerFullStackedRow: 2,
          fullStackedRows: 5,
          fullStackedGoods: 10,
          loadingMeter: 333.33333333333337,
          loadingMeterBase: 66.66666666666667,
          remainingGoods: 0,
          isValid: true,
        },
        {
          cargoId: 3,
          orderId: 0,
          truckId: 1,
          stacking: { stackingFactor: 5, remainingHeight: 20 },
          goodsPerRow: 1,
          goodsPerFullStackedRow: 5,
          fullStackedRows: 6,
          fullStackedGoods: 30,
          loadingMeter: 373.33333333333337,
          loadingMeterBase: 53.333333333333336,
          remainingGoods: 3,
          isValid: true,
        },
      ],
    },
  ],
};
