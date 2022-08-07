import React from 'react';

import CostumList from '../../../components/ui/CostumList';
import ListItem from './OrderSliderItem';
import { useEffectOnce } from '../../../hooks/useEffectOnce';
import { FetchAllOrder, SelectOrderState, useAppDispatch, useAppSelector } from '../../../store';

export default function OrderSlider() {
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    if (loading !== 'idle') return;
    dispatch(FetchAllOrder());
  });

  const { orders,loading } = useAppSelector(SelectOrderState);

  const getListItems = () => orders.map((order) => <ListItem order={order} />);

  return <CostumList orientation="vertical">{getListItems()}</CostumList>;
}
