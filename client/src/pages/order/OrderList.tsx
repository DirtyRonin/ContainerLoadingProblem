import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SelectOrderState, FetchAllOrder } from '../../store/slices/order/OrderSlice';
import CustomList from '../../components/ui/CostumList';
import { OrderListItem } from './OrderListItem';
import { Order } from '../../models';
import { IOrder } from '../../interfaces';
import { useEffectOnce } from '../../hooks/useEffectOnce';

export const OrderList = () => {
  const dispatch = useAppDispatch();

  const { orders, loading } = useAppSelector(SelectOrderState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllOrder());
  });

  const newOrder = Order.AsInitializeDefault('New Order');

  const mergeOrder = [newOrder, ...orders];

  const getListItems = (orders: IOrder[]) => orders.map((x) => <OrderListItem order={x} />);

  return <CustomList orientation="vertical">{getListItems(mergeOrder)}</CustomList>;
};
