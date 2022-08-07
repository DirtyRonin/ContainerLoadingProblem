import * as React from 'react';

import { useAppDispatch, useAppSelector, SelectCargoState, FetchAllCargo } from '../../store';
import CostumList from '../../components/ui/CostumList';
import CargoListItem from './CargoListItem';
import { Cargo,Goods } from '../../models';
import { ICargo } from '../../interfaces';
import { useEffectOnce } from '../../hooks/useEffectOnce';

export default function CargoList() {
  const dispatch = useAppDispatch();
  const { cargos, loading } = useAppSelector(SelectCargoState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;

    dispatch(FetchAllCargo());
  });

  const newCargo = Cargo.AsInitializeDefault(Goods.AsInitializeDefault('Create new Cargo'));

  const mergeCargo = [newCargo, ...cargos];

  const getListItems = (cargos: ICargo[]) => cargos.map((x) => <CargoListItem cargo={x} />);

  return <CostumList orientation="vertical">{getListItems(mergeCargo)}</CostumList>;
}
