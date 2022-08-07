import React from 'react';

import CostumList from '../../../components/ui/CostumList';
import { ITruck } from '../../../interfaces';
import ListItem from './truckSliderItems';
import { useEffectOnce } from '../../../hooks/useEffectOnce';
import { FetchAllTrucks, SelectTruckState, useAppDispatch, useAppSelector } from '../../../store';

export default function TruckSlider() {
  const dispatch = useAppDispatch();
  const { trucks, loading } = useAppSelector(SelectTruckState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllTrucks());
  });

  const getListItems = (trucks: ITruck[]) => trucks.map((truck) => <ListItem truck={truck} />);

  return <CostumList orientation="vertical">{getListItems(trucks)}</CostumList>;
}