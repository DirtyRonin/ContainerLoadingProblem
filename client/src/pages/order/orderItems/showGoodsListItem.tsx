import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GoodsIcon from '@mui/icons-material/LocalShipping';
import ListItem from '@mui/material/ListItem';

import { IGoods } from '../../../interfaces';

interface Props {
  singleGoods: IGoods;
}

export default function DashboardGoodsListItem(props: Props) {
  const { singleGoods } = props;

  return (
    <ListItem dense={true}>
      <ListItemIcon>
        <GoodsIcon />
      </ListItemIcon>
      <ListItemText primary={singleGoods.name} secondary={`${singleGoods.length} * ${singleGoods.width}`} />
    </ListItem>
  );
}
