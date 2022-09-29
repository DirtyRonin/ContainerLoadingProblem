import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomList from '../../components/ui/CostumList';
import { FetchTruckLoadingByRouteId, SelectRouteState } from './slices/RouteSlice';
import ListItem from './RouteTruckloadingsListItem';
import { initialPopulatedTruckLoading, IPopulatedTruckLoading } from '../../interfaces';
import { IsStringEmpty } from '../../utils/shared';

import { UnselectTruckLoadingId, ClearRoutes } from './slices/RouteSlice';
import TrucksMultiSelectChips from './TrucksMultiSelect';

export default function CargoList() {
  const dispatch = useAppDispatch();
  const { truckLoadings, selectedRouteId, routes, selectedTruckLoadingId } = useAppSelector(SelectRouteState);

  useEffect(() => {
    dispatch(UnselectTruckLoadingId());
    if (IsStringEmpty(selectedRouteId)) {
      ClearRoutes();
      return;
    }

    dispatch(FetchTruckLoadingByRouteId(selectedRouteId));
  }, [selectedRouteId]);

  // current fetched values with a default value in the frist index for creating a new entry
  const truckLoadingsList: IPopulatedTruckLoading[] = [initialPopulatedTruckLoading(), ...truckLoadings.value];

  const getListItems = (populatedTruckLoadings: IPopulatedTruckLoading[]) => populatedTruckLoadings.map((populatedTruckLoading) => <ListItem populatedTruckLoading={populatedTruckLoading} />);


  return <CustomList orientation="vertical">{getListItems(truckLoadingsList)}</CustomList>;
}
