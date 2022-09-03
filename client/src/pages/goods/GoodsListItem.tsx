import React, { ReactNode } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DeleteIcon from '@mui/icons-material/Delete';
import { IGoods } from '../../interfaces';

import { useAppDispatch, useAppSelector, SelectSingleGoods, SelectGoodsListState, DeleteGoods } from '../../store';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { GetEditStatus } from '../../utils/shared';

interface Props {
  singleGoods: IGoods;
}

export const GoodsListItem = (props: Props) => {
  const { singleGoods } = props;

  const dispatch = useAppDispatch();
  const { selectedSingleGoods } = useAppSelector(SelectGoodsListState);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => dispatch(SelectSingleGoods(singleGoods));

  const handleOnDelete = () => {
    dispatch(DeleteGoods(singleGoods._id));
  };

  const isSelected = () => singleGoods._id === selectedSingleGoods.id;

  const isRemovable = () => {
    const {_id: id,isReadonly} = singleGoods
    const status = GetEditStatus(id,isReadonly)

    return status === 'Update' ? true : false;
  }

  const show = (children: ReactNode) => {
    if (!isRemovable()) return <ListItem dense={true}>{children}</ListItem>;

    return (
      <ListItem
        dense={true}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={handleOnDelete}>
            <DeleteIcon />
          </IconButton>
        }
      >
        {children}
      </ListItem>
    );
  };

  return show(
    <ListItemButton selected={isSelected()} onClick={handleOnSelect}>
      <ListItemIcon>
        <ViewInArIcon />
      </ListItemIcon>
      <ListItemText primary={singleGoods.name} secondary={singleGoods.name} />
    </ListItemButton>
  );
};
