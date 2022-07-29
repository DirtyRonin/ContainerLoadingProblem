import { ITruck } from "../../models/Truck";

export const AddTrucksUp = (a: ITruck, b: ITruck) => {
  const truckA = { ...a };
  const truckB = { ...b };

  truckA.height += truckB.height;
  truckA.length += truckB.length;
  truckA.width += truckB.width;
  truckA.maxWeight += truckB.maxWeight;

  return { ...truckA };
};
