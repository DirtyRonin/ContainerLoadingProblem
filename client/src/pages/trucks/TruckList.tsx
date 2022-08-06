import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CostumList from '../../components/ui/CostumList';
import TruckListItem from './TruckListItem';
import { Truck } from '../../models';
import { ITruck } from '../../interfaces';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { FetchAllTrucks, SelectTruckState } from '../../store/slices/truck/TruckSlice';

export default function TruckList() {
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(FetchAllTrucks());
  });

  const { trucks } = useAppSelector(SelectTruckState);
  const newTruck = Truck.As15er('Create New As15er');

  const mergeTrucks = [newTruck, ...trucks];

  const getListItems = (trucks: ITruck[]) => trucks.map((truck) => <TruckListItem truck={truck} />);

  return <CostumList orientation='vertical'>{getListItems(mergeTrucks)}</CostumList>;
}
