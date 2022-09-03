import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector, SelectCargoState, SelectOrderListState, UnselectCargoId, FetchCargoByOrderId } from '../../store';
import CustomList from '../../components/ui/CostumList';
import ListItem from './CargoListItem';
import { Cargo } from '../../models';
import { ICargo } from '../../interfaces';
import { IsStringEmpty } from '../../utils/shared';

export default function CargoList() {
  const dispatch = useAppDispatch();
  const { selectedOrderId } = useAppSelector(SelectOrderListState);
  const { cargos, loading } = useAppSelector(SelectCargoState);

  useEffect(() => {
    dispatch(UnselectCargoId());
    if (IsStringEmpty(selectedOrderId)) return;

    dispatch(FetchCargoByOrderId(selectedOrderId));
  }, [selectedOrderId]);

  const newCargos: ICargo[] = [Cargo.AsInitializeDefault(), ...cargos];

  const getListItems = (cargos: ICargo[]) => cargos.map((cargo) => <ListItem cargo={cargo} />);

  return <CustomList orientation="vertical">{getListItems(newCargos)}</CustomList>;
}
