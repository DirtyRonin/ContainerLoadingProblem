import React, { ReactNode } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICargo, IGoods } from '../../interfaces';

import { useAppDispatch, useAppSelector, SelectCargo, SelectCargoListState, DeleteCargo } from '../../store';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { GetEditStatus } from '../../utils/shared';

interface Props {
  cargo: ICargo;
}

export default function CargoListItem(props: Props) {
  const { cargo } = props;

  const dispatch = useAppDispatch();
  const { selectedCargo } = useAppSelector(SelectCargoListState);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => dispatch(SelectCargo(cargo));

  const handleOnDelete = () => {
    dispatch(DeleteCargo(cargo.id));
  };

  const isSelected = () => cargo.id === selectedCargo.id;

  const isRemovable = () => {
    const { id } = cargo;
    const status = GetEditStatus(id);

    return status === 'Update' ? true : false;
  };

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
      <ListItemText primary={(cargo.singleGoods as IGoods)?.name ?? 'Primary'} secondary={cargo.quantity} />
    </ListItemButton>
  );
}
