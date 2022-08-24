import React, { useEffect } from 'react';

import CustomList from '../../../components/ui/CostumList';
import { ITruck } from '../../../interfaces';
import ListItem from './truckSliderItems';
import { FetchAllTrucks, SelectTruckState, useAppDispatch, useAppSelector } from '../../../store';

export default function TruckSlider() {
  const dispatch = useAppDispatch();
  const { trucks, loading } = useAppSelector(SelectTruckState);

  useEffect(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllTrucks());
  }, []);

  const getListItems = (trucks: ITruck[]) => trucks.map((truck) => <ListItem truck={truck} />);

  return <CustomList orientation="vertical">{getListItems(trucks)}</CustomList>;
}
