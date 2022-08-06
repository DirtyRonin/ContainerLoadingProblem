import React, { useEffect, useState } from 'react';

import CostumList from '../../../components/ui/CostumList';
import { AsyncStatus } from '../../../models';
import { IGoods } from '../../../interfaces';
import { GoodsApi } from '../../../apis/goodsApi';
import ListItem from './showGoodsListItem';

export default function DashboardTruckList() {
  const [goods, setGoods] = useState<IGoods[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');

  useEffect(() => {
    if (status !== 'idle') return;

    setStatus('pending');
    GoodsApi.FetchGoods()
      .then((result) => {
        setGoods(result);
        setStatus('succeeded');
      })
      .catch((error: Error) => {
        setStatus('failed');
        return error;
      });
  }, [status]);

  const getListItems = (goods: IGoods[]) => goods.map((singleGoods) => <ListItem singleGoods={singleGoods} />);

  return <CostumList orientation="horizontal">{getListItems(goods)}</CostumList>;
}
