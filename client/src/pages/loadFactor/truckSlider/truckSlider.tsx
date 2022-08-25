import React, { useEffect, useReducer } from 'react';

import CustomList from '../../../components/ui/CostumList';
import { ITruck } from '../../../interfaces';
import ListItem from './truckSliderItems';
import { TruckApi } from '../../../apis/trucksApi';
import { createActionCreators, createReducerFunction } from 'immer-reducer';
import truckReducer, { INITIAL_STATE } from './truckReducer';

export default function TruckSlider() {
  const reducerFunction = createReducerFunction(truckReducer);
  const ActionCreators = createActionCreators(truckReducer);

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  useEffect(() => {
    if (state.loading !== 'idle') return;

    dispatch(ActionCreators.fetchAllTrucks_Pending());

    TruckApi.FetchTrucks()
      .then((result) => dispatch(ActionCreators.fetchAllTrucks_Success(result)))
      .catch((e) => dispatch(ActionCreators.fetchAllTrucks_Failed()));
  }, []);

  const getListItems = (trucks: ITruck[]) => trucks.map((truck) => <ListItem truck={truck} />);

  return <CustomList orientation="vertical">{getListItems(state.trucks)}</CustomList>;
}
