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

  const { selectedTruckIds, selectedLoadSummaryIds, removeTruckId, addTruckId } = loadAnalyzerContext();

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isTruckChecked());
  }, []);

  const isTruckChecked = () => (selectedTruckIds.find((x) => x === truck.id) ? true : false);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (selectedLoadSummaryIds.find((x) => x.truckId === truck.id) !== undefined) return;

    setChecked(!isChecked);

    if (isChecked) {
      removeTruckId(truck.id);
      return;
    }

    addTruckId(truck.id);
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
