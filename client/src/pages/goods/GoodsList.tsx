import * as React from 'react';

import { useAppDispatch, useAppSelector, SelectGoodsState, FetchAllGoods } from '../../store';
import CustomList from '../../components/ui/CostumList';
import { GoodsListItem } from './GoodsListItem';
import { Goods } from '../../models';
import { IGoods } from '../../interfaces';
import { useEffectOnce } from '../../hooks/useEffectOnce';

export const GoodsList = () => {
  const dispatch = useAppDispatch();
  const { goods, loading } = useAppSelector(SelectGoodsState);

  useEffectOnce(() => {
    if (loading !== 'idle') return;
    
    dispatch(FetchAllGoods());
  });

  const newGoods = Goods.AsSuperHeavy('Create Super Heavy Goods');

  const mergeGoods = [newGoods, ...goods];

  const getListItems = (goods: IGoods[]) => goods.map((x) => <GoodsListItem singleGoods={x} />);

  return <CustomList orientation="vertical">{getListItems(mergeGoods)}</CustomList>;
};
