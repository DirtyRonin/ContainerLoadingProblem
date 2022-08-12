import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector, SelectCargoState, SelectOrderListState, FetchCargoByOrderId,UnselectCargo } from '../../store';
import CostumList from '../../components/ui/CostumList';
import ListItem from './CargoListItem';
import { Cargo } from '../../models';
import { ICargo } from '../../interfaces';

export default function CargoList() {
  const dispatch = useAppDispatch();
  const { selectedOrderId } = useAppSelector(SelectOrderListState);
  const { cargos, loading } = useAppSelector(SelectCargoState);

  useEffect(() => {
    dispatch(UnselectCargo())
    dispatch(FetchCargoByOrderId(selectedOrderId));

  }, [selectedOrderId]);

  const newCargos: ICargo[] = [Cargo.AsInitializeDefault(), ...cargos];

  const getListItems = (cargos: ICargo[]) => cargos.map((cargo) => <ListItem cargo={cargo} />);

  return <CostumList orientation="vertical">{getListItems(newCargos)}</CostumList>;
}
