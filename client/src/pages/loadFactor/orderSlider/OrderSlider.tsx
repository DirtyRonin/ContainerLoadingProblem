import React,{useEffect, useReducer} from 'react';
import { createReducerFunction, createActionCreators } from 'immer-reducer';

import CustomList from '../../../components/ui/CostumList';
import ListItem from './OrderSliderItem';
import orderReducer,{ INITIAL_STATE } from './orderReducer'
import { OrderApi } from '../../../apis/ordersApi';

export default function OrderSlider() {

  const reducerFunction = createReducerFunction(orderReducer);
  const ActionCreators = createActionCreators(orderReducer);

  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);


  useEffect(() => {
    if (state.loading !== 'idle') return;

    dispatch(ActionCreators.fetchAllOrders_Pending());

    OrderApi.FetchOrder()
      .then((result) => dispatch(ActionCreators.fetchAllOrders_Success(result)))
      .catch((e) => dispatch(ActionCreators.fetchAllOrders_Failed()));
  }, []);


  const getListItems = () => state.orders.map((order) => <ListItem order={order} />);

  return <CustomList orientation="vertical">{getListItems()}</CustomList>;
}
