import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SelectOrderState, FetchAllOrder } from '../../store/slices/order/OrderSlice';
import CustomList from '../../components/ui/CostumList';
import { OrderListItem } from './OrderListItem';
import { IOrder,initializeOrder } from '../../interfaces';
import { useEffectOnce } from '../../hooks/useEffectOnce';

export const OrderList = () => {
  const dispatch = useAppDispatch();

  const { orders, loading } = useAppSelector(SelectOrderState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllOrder());
  });

  const newOrder = [initializeOrder()];

  const mergeOrder = newOrder.concat(orders)

  const getListItems = (orders: IOrder[]) => orders.map((x) => <OrderListItem order={x} />);

  return <CustomList orientation="vertical">{getListItems(mergeOrder)}</CustomList>;
};
