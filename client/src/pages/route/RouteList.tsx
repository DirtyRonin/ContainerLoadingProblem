import * as React from 'react';

import CustomList from '../../components/ui/CostumList';
import { IRoute,initializeRoute } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SelectRouteState, FetchAllRoutes } from './slices/RouteSlice';
import ListItem from './RouteListItem'

export default function TruckList() {
  const dispatch = useAppDispatch();
  const { routes } = useAppSelector(SelectRouteState);

  React.useEffect(() => {
    if (routes.status === 'pending') return;

    dispatch(FetchAllRoutes());
  },[]);

  const availableRoutes = [initializeRoute(), ...routes.value];

  const getListItems = (routes: IRoute[]) => routes.map((route) => <ListItem route={route} />);

  return <CustomList orientation="vertical">{getListItems(availableRoutes)}</CustomList>;
}
