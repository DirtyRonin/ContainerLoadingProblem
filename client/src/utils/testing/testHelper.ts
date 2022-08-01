import { Cargo, Container } from '../../models';

// export const testGoods = (helper: IMathHelper) => ({
//   l100w120h80: new Goods(0, "l100w120h80", 80, 120, 100, 5000, helper),
//   l80w120h120: new Goods(0, "l80w120h120", 120, 120, 80, 1000, helper),
//   l160w120h80: new Goods(0, "l160w120h80", 80, 120, 160, 1000, helper),
//   AsInitializeDefault: new Goods(0, "", 0, 0, 0, 0, helper),
// });

// export const testContainer = (helper: IMathHelper) => ({
//   StandardTruck: new Truck(
//     0,
//     "StandardTruck",
//     270,
//     240,
//     1360,
//     20000,
//     100,
//     100,
//     helper
//   ),
//   AsInitializeDefault: new Truck(0, "", 0, 0, 0, 0, 0, 0, helper),
// });

// export const testCargo = (helper: IMathHelper) => ({
//   AsInitializeDefault: new Cargo(
//     testGoods(helper).AsInitializeDefault,
//     0,
//     false
//   ),
// });

const testContainers =  {
  AsInitializeDefault: new Container(0, 0, 0),
  box_l100w120h80: new Container(100, 120, 80),
  box_l80w120h120: new Container(80, 120, 120),
  box_l160w120h80: new Container(160, 120, 80),
  Truck_l1360w240h270: new Container(1360, 240, 270),
  oversized_box_l1500w120h80: new Container(1500, 120, 80),
  oversized_box_l120w1600h80: new Container(100, 1600, 80),
  oversized_box_l120w120h1700: new Container(100, 120, 1700),
};
const testCargos = {
  AsInitializeDefault: new Cargo(testContainers.AsInitializeDefault, 0, false),
};

export const testHelper = {
  testContainers: { ...testContainers },
  testCargos: { ...testCargos },
};
