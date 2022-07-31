import { Cargo, Goods, Truck } from "../../models";

export const testGoods = {
    l100w120h80: new Goods(0, "l100w120h80", 80, 120, 100, 5000),
    l80w120h120 : new Goods(0, "l80w120h120", 120, 120, 80, 1000),
    l160w120h80 : new Goods(0, "l160w120h80", 80, 120, 160, 1000),
    AsInitializeDefault: new Goods(0, "", 0, 0, 0, 0),
  };

export const testContainer = {
  StandardTruck: new Truck(0, 'StandardTruck', 270, 240, 1360, 20000, 100, 100),
  AsInitializeDefault:new Truck(0, '', 0, 0, 0, 0, 0, 0),
}

export const testCargo = {
  AsInitializeDefault:new Cargo(testGoods.AsInitializeDefault, 0, false),
}