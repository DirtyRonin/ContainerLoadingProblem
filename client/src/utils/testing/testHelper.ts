import { Cargo, Container, Area, Goods } from '../../models';

// const testContainers =  {
//   AsInitializeDefault: new Container(0, 0, 0),
//   box_l100w120h80: new Container(100, 120, 80),
//   box_l80w120h120: new Container(80, 120, 120),
//   box_l160w120h80: new Container(160, 120, 80),
//   Truck_l1360w240h270: new Container(1360, 240, 270),
//   oversized_box_l1500w120h80: new Container(1500, 120, 80),
//   oversized_box_l120w1600h80: new Container(100, 1600, 80),
//   oversized_box_l120w120h1700: new Container(100, 120, 1700),
// };

const testAreas = {
  area_l100w120: Goods.WithValues(100, 120),
  area_l80w120: Goods.WithValues(80, 120),
  area_l160w120: Goods.WithValues(160, 120),
  oversized_area_l1500w120: Goods.WithValues(1500, 120),
  oversized_area_l120w1600: Goods.WithValues(100, 1600),
  oversized_area_l120w120h: Goods.WithValues(100, 120),
};

const testContainers = {
  AsInitializeDefault: new Container(0, 0, 0),
  Truck_l1360w240h270: new Container(1360, 240, 270),
  Truck_l500w240h200: new Container(500, 240, 200),
};

const testCargos = {
  AsInitializeDefault: Cargo.WithGoods(0, 0, 0, Goods.AsInitializeDefault(), 0, false, 0),
  area_l100w120: Cargo.WithGoods(0, 0, 0, Goods.WithValues(100, 120), 1, false, 80),
  // area_l80w120: new Cargo((80, 120),1,false,80),
  // area_l160w120: new Cargo((160, 120),1,false,80),
  // oversized_area_l1500w120: new Cargo((1500, 120),1,false,80),
  // oversized_area_l120w1600: new Cargo((100, 1600),1,false,80),
  // oversized_area_l120w120h: new Cargo((100, 120),1,false,80),
  '1/2euro': ({ quantity = 0, isStackable = false, height = 0, id = 1 }) => customCargo({ quantity, isStackable, length: 40, width: 60, height, id }),
  '1/4euro': ({ quantity = 0, isStackable = false, height = 0, id = 1 }) => customCargo({ quantity, isStackable, length: 60, width: 75, height, id }),
  euro: ({ quantity = 0, isStackable = false, height = 0, id = 1 }) => customCargo({ quantity, isStackable, length: 80, width: 120, height, id }),
  indu: ({ quantity = 0, isStackable = false, height = 0, id = 1 }) => customCargo({ quantity, isStackable, length: 100, width: 120, height, id }),
};

const customCargo = ({
  quantity,
  isStackable,
  height,
  length,
  width,
  id,
}: {
  quantity: number;
  isStackable: boolean;
  height: number;
  length: number;
  width: number;
  id: number;
}) => ({
  truckId: 0,
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
  middleTruck_L620xW245xH240: (id = 1) => customTruck({ length: 620, width: 245, height: 240, id }),
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
