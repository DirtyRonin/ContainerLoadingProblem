import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, ListItem } from '@mui/material';
import GoodsIcon from '@mui/icons-material/LocalShipping';

import { IGoods } from '../../../interfaces';
import { useAppDispatch, useAppSelector, SelectSingleGoods, SelectGoodsListState } from '../../../store';

interface Props {
  singleGoods: IGoods;
}

export default function DashboardGoodsListItem(props: Props) {
  const { singleGoods } = props;

  const dispatch = useAppDispatch();
  const { selectedSingleGoods } = useAppSelector(SelectGoodsListState);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => dispatch(SelectSingleGoods(singleGoods));

  const isSelected = () => singleGoods.id === selectedSingleGoods.id;

  return (
    <ListItem dense={true}>
      <ListItemButton selected={isSelected()} onClick={handleOnSelect}>
        <ListItemIcon>
          <GoodsIcon />
        </ListItemIcon>
        <ListItemText primary={singleGoods.name} secondary={`${singleGoods.length} * ${singleGoods.width}`} />
      </ListItemButton>
    </ListItem>
  );
}
