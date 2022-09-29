import React, { useState, useEffect } from 'react';

import TruckIcon from '@mui/icons-material/LocalShipping';

import { ListItemButton, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import { ITruck } from '../../../interfaces/';
import { removeTruckId, addTruckId, SelectLoadAnalyzerState } from '../slice/LoadAnalyzerSlice';
import { useAppDispatch, useAppSelector } from '../../../store';
interface Props {
  truck: ITruck;
}

export default function TruckSliderListItem({ truck }: Props) {
  const dispatch = useAppDispatch();
  const { selectedTruckIds, selectedLoadSummaryIds } = useAppSelector(SelectLoadAnalyzerState);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isTruckChecked());
  }, [selectedTruckIds]);

  const isTruckChecked = () => (selectedTruckIds.find((x) => x === truck._id) ? true : false);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (selectedLoadSummaryIds.find((x) => x.truckId === truck._id) !== undefined) return;

    setChecked(!isChecked);

    if (isChecked) {
      dispatch(removeTruckId(truck._id));
      return;
    }

    dispatch(addTruckId(truck._id));
  };

  return (
    <ListItem dense={true}>
      <ListItemButton onClick={handleOnSelect}>
        <ListItemIcon>
          <TruckIcon />
        </ListItemIcon>
        <ListItemText primary={truck.vehicleIdentifier} secondary={`#${truck.vehicleIdentifier}-${truck._id}`} />
        <ListItemIcon>
          <Checkbox edge="end" tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': 'labelId' }} checked={isChecked} />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}
