import React, {  } from 'react';

import { useAppDispatch, useAppSelector, SelectGoodsState, FetchAllGoods } from '../../../store';
import CostumList from '../../../components/ui/CostumList';
import { IGoods } from '../../../interfaces';
import ListItem from './showGoodsListItem';
import { useEffectOnce } from '../../../hooks/useEffectOnce';

export default function DashboardTruckList() {
  const dispatch = useAppDispatch();
  const { goods, loading } = useAppSelector(SelectGoodsState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;
    
    dispatch(FetchAllGoods());
  });
  const getListItems = (goods: IGoods[]) => goods.map((singleGoods) => <ListItem singleGoods={singleGoods} />);

  return <CostumList orientation="horizontal">{getListItems(goods)}</CostumList>;
}
