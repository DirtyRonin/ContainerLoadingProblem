import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { SelectGoodsState,FetchAllGoods } from "./slices/GoodsSlice";
import  CostumList  from "../../components/ui/CostumList";
import { GoodsListItem } from "./GoodsListItem";
import { Goods } from "../../models";
import { IGoods } from "../../interfaces";
import { useEffectOnce } from "../../hooks/useEffectOnce";

export const GoodsList = () => {

  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(FetchAllGoods());
  });


  const { goods } = useAppSelector(SelectGoodsState);
  const newGoods = Goods.AsSuperHeavy("Create Super Heavy Goods")

  const mergeGoods = [newGoods,...goods]

  const getListItems = (goods: IGoods[]) =>
    goods.map((x) => <GoodsListItem goods={x} />);

  return <CostumList>{getListItems(mergeGoods)}</CostumList>;
};