import * as React from "react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { SelectTruckState,FetchAllTrucks } from "./truckSlice";
import { CostumList } from "../components/ui/CostumList";
import { TruckListItem } from "./TruckListItem";
import { Truck,ITruck } from "../models/truck";
import { useEffectOnce } from "../hooks/useEffectOnce";

export const TruckList = () => {

  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(FetchAllTrucks());
  });


  const { trucks } = useAppSelector(SelectTruckState);
  const newTruck = Truck.AsDefault("Create New Truck")

  const mergeTrucks = [newTruck,...trucks]

  const getListItems = (trucks: ITruck[]) =>
    trucks.map((truck) => <TruckListItem truck={truck} />);

  return <CostumList>{getListItems(mergeTrucks)}</CostumList>;
};

