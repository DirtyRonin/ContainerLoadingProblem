import React, { useState, useEffect } from 'react';

import TruckIcon from '@mui/icons-material/LocalShipping';
import { ListItemButton, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';

import { ITruck } from '../../../interfaces/';
import loadAnalyzerContext from '../contexts/LoadAnalyzerContext';
interface Props {
  truck: ITruck;
}

export default function TruckSliderListItem(props: Props) {
  const { truck } = props;

  const { selectedTruckIds, removeTruckId, addTruckId } = loadAnalyzerContext();

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isTruckChecked());
  }, []);

  const isTruckChecked = () => (selectedTruckIds.find((x) => x === truck.id) ? true : false);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isChecked) {
      removeTruckId(truck.id);
    } else {
      addTruckId(truck.id);
    }
    console.log(selectedTruckIds, truck.id);
    setChecked(!isChecked);
  };

  return (
    <ListItem dense={true}>
      <ListItemButton onClick={handleOnSelect}>
        <ListItemIcon>
          <TruckIcon />
        </ListItemIcon>
        <ListItemText primary={truck.vehicleIdentifier} secondary={`#${truck.vehicleIdentifier}-${truck.id}`} />
        <ListItemIcon>
          <Checkbox edge="end" tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': 'labelId' }} checked={isChecked} />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}
