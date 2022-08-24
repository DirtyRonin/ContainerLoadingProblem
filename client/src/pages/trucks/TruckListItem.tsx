import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TruckIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ITruck } from '../../interfaces/';
import { SelectTruckListState, SelectTruckId, DeleteTruck } from '../../store/slices/truck';

interface Props {
  truck: ITruck;
}

export default function TruckListItem(props: Props) {
  const { truck } = props;

  const dispatch = useAppDispatch();
  const { selectedTruckId } = useAppSelector(SelectTruckListState);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => dispatch(SelectTruckId(truck.id));

  const handleOnDelete = () => {
    dispatch(DeleteTruck(truck.id));
  };

  const isSelected = () => selectedTruckId === truck.id;

  return (
    <ListItem
      key={`truckId-${truck.id}`}
      dense={true}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleOnDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton selected={isSelected()} onClick={handleOnSelect}>
        <ListItemIcon>
          <TruckIcon />
        </ListItemIcon>
        <ListItemText primary={truck.vehicleIdentifier} secondary={truck.vehicleIdentifier} />
      </ListItemButton>
    </ListItem>
  );
}
