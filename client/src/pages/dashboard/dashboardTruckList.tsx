import React, { useEffect, useState } from 'react';

import CostumList from '../../components/ui/CostumList';
import { AsyncStatus } from '../../models';
import { ITruck } from '../../interfaces';
import { TruckApi } from '../../apis/trucksApi';
import ListItem from './dashboardTruckListItem';

export default function DashboardTruckList() {
  const [trucks, setTrucks] = useState<ITruck[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');

  useEffect(() => {
    if (status !== 'idle') return;

    setStatus('pending');
    TruckApi.FetchTrucks()
      .then((result) => {
        setTrucks(result);
        setStatus('succeeded');
      })
      .catch((error: Error) => {
        setStatus('failed');
        return error;
      });
  }, [status]);

  const getListItems = (trucks: ITruck[]) => trucks.map((truck) => <ListItem truck={truck} />);

  return <CostumList orientation="horizontal">{getListItems(trucks)}</CostumList>;
}
