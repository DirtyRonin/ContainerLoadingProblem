import React,{useEffect, useReducer} from 'react';
import { createReducerFunction, createActionCreators } from 'immer-reducer';

import CustomList from '../../../components/ui/CostumList';
import ListItem from './RouteSliderItem';
import routeReducer,{ INITIAL_STATE } from './routeReducer'
import { RouteApi } from '../../../apis/routeApi';

export default function RouteSlider() {

  const reducerFunction = createReducerFunction(routeReducer);
  const ActionCreators = createActionCreators(routeReducer);

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);


  useEffect(() => {
    if (state.loading !== 'idle') return;

    dispatch(ActionCreators.fetchAllRoutes_Pending());

    RouteApi.FetchRoutes()
      .then((result) => dispatch(ActionCreators.fetchAllRoutes_Success(result)))
      .catch((e) => dispatch(ActionCreators.fetchAllRoutes_Failed()));
  }, []);


  const getListItems = () => state.routes.map((route) => <ListItem route={route} />);

  return <CustomList orientation="vertical">{getListItems()}</CustomList>;
}
