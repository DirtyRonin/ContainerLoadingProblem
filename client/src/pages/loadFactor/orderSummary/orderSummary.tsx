import React, {  } from 'react';

import CostumList from '../../../components/ui/CostumList';
import ListItem from './orderSummaryItem';
import { useEffectOnce } from '../../../hooks/useEffectOnce';
import { useAppDispatch, useAppSelector } from '../../../store';
import { SelectOrderMultiSelectState } from '../../../store/slices/order/OrderMultiSelectSlice';
import { FetchAllCargo, SelectCargoState } from '../../../store/slices/cargo/CargoSlice';

export default function OrderSummary() {
  const dispatch = useAppDispatch();

  const { selectedOrderIds } = useAppSelector(SelectOrderMultiSelectState);

  const { loading } = useAppSelector(SelectCargoState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllCargo());
  });


  

  const getListItems = () => selectedOrderIds.map((id) => <ListItem id={id} />);

  return <CostumList orientation="vertical">{getListItems()}</CostumList>;
}
