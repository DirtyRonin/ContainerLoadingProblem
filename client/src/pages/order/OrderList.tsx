import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SelectOrderState, FetchAllOrder } from '../../store/slices/order/OrderSlice';
import CostumList from '../../components/ui/CostumList';
import { OrderListItem } from './OrderListItem';
import { Order } from '../../models';
import { IOrder } from '../../interfaces';
import { useEffectOnce } from '../../hooks/useEffectOnce';

export const OrderList = () => {
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(FetchAllOrder());
  });

  const { orders } = useAppSelector(SelectOrderState);
  const newOrder = Order.AsInitializeDefault('New Order');

  const mergeOrder = [newOrder, ...orders];

  const getListItems = (orders: IOrder[]) => orders.map((x) => <OrderListItem order={x} />);

  return <CostumList orientation="vertical">{getListItems(mergeOrder)}</CostumList>;
};
