import React, { ReactNode } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICargo } from '../../interfaces';

import { useAppDispatch, useAppSelector, SelectCargoId, SelectCargoListState, DeleteCargo } from '../../store';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { GetEditStatus, IsStringEmpty } from '../../utils/shared';

interface Props {
  cargo: ICargo;
}

export default function CargoListItem(props: Props) {
  const { cargo } = props;

  const dispatch = useAppDispatch();
  const { selectedCargoId} = useAppSelector(SelectCargoListState);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(SelectCargoId(cargo._id));
  };

  const handleOnDelete = () => {
    dispatch(DeleteCargo(cargo._id));
  };

  const isSelected = () => cargo._id === selectedCargoId;

  const isRemovable = () => {
    const { _id: id } = cargo;
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
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary={cargo.name} secondary={`${cargo.length} * ${cargo.width}`} />
    </ListItemButton>
  );
}
