import * as React from 'react';

import { useAppDispatch, useAppSelector, SelectCargoState, FetchAllCargo, SelectOrderListState } from '../../store';
import CostumList from '../../components/ui/CostumList';
import CargoListItem from './CargoListItem';
import { Cargo, Goods } from '../../models';
import { ICargo } from '../../interfaces';
import { useEffectOnce } from '../../hooks/useEffectOnce';

export default function CargoList() {
  const dispatch = useAppDispatch();
  const { selectedOrderId } = useAppSelector(SelectOrderListState);

  const { cargos, loading } = useAppSelector(SelectCargoState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllCargo());
  });

  const filterCargosByOrderId = (orderId: number) => cargos.filter((_) => _.orderId === orderId);

  const newCargos: ICargo[] = [
    Cargo.AsInitializeDefault(Goods.AsInitializeDefault('Create new Cargo')),
    ...filterCargosByOrderId(selectedOrderId),
  ];

  const getListItems = (cargos: ICargo[]) => cargos.map((x) => <CargoListItem cargo={x} />);

  return <CostumList orientation="horizontal">{getListItems(newCargos)}</CostumList>;
}
