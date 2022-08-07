import { Cargo, Container, Area } from '../../models';

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
  area_l100w120: new Area(100, 120),
  area_l80w120: new Area(80, 120),
  area_l160w120: new Area(160, 120),
  oversized_area_l1500w120: new Area(1500, 120),
  oversized_area_l120w1600: new Area(100, 1600),
  oversized_area_l120w120h: new Area(100, 120),
};

const testContainers = {
  AsInitializeDefault: new Container(0, 0, 0),
  Truck_l1360w240h270: new Container(1360, 240, 270),
};

const testCargos = {
  AsInitializeDefault: new Cargo(0, 0, 0, Area.AsInitializeDefault, 0, false, 0),
  area_l100w120: new Cargo(0, 0, 0, new Area(100, 120), 1, false, 80),
  // area_l80w120: new Cargo((80, 120),1,false,80),
  // area_l160w120: new Cargo((160, 120),1,false,80),
  // oversized_area_l1500w120: new Cargo((1500, 120),1,false,80),
  // oversized_area_l120w1600: new Cargo((100, 1600),1,false,80),
  // oversized_area_l120w120h: new Cargo((100, 120),1,false,80),
};

export const testHelper = {
  testContainers: { ...testContainers },
  testCargos: { ...testCargos },
  testAreas: { ...testAreas },
};
