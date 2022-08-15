import * as React from 'react';

import CustomList from '../../components/ui/CostumList';
import TruckListItem from './TruckListItem';
import { Truck } from '../../models';
import { ITruck } from '../../interfaces';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { FetchAllTrucks, SelectTruckState, useAppDispatch, useAppSelector } from '../../store';

export default function TruckList() {
  const dispatch = useAppDispatch();
  const { trucks, loading } = useAppSelector(SelectTruckState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllTrucks());
  });

  const newTruck = Truck.As15er('Create New As15er');

  const mergeTrucks = [newTruck, ...trucks];

  const getListItems = (trucks: ITruck[]) => trucks.map((truck) => <TruckListItem truck={truck} />);

  return <CustomList orientation="vertical">{getListItems(mergeTrucks)}</CustomList>;
}
