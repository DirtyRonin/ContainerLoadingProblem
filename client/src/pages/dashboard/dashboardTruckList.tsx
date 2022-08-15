import React, { useEffect, useState } from 'react';

import CustomList from '../../components/ui/CostumList';
import { ITruck } from '../../interfaces';
import ListItem from './dashboardTruckListItem';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { FetchAllTrucks, SelectTruckState, useAppDispatch, useAppSelector } from '../../store';

export default function DashboardTruckList() {
  const dispatch = useAppDispatch();
  const { trucks, loading } = useAppSelector(SelectTruckState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllTrucks());
  });

  const getListItems = (trucks: ITruck[]) => trucks.map((truck) => <ListItem truck={truck} />);

  return <CustomList orientation="horizontal">{getListItems(trucks)}</CustomList>;
}
