import React, { useState, useEffect } from 'react';

import TruckIcon from '@mui/icons-material/LocalShipping';
import { ListItemButton, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';

import { useAppDispatch } from '../../../store';
import { ITruck } from '../../../interfaces/';

import useTruck from '../contexts/TruckContext';

interface Props {
  truck: ITruck;
}

export default function TruckSliderListItem(props: Props) {
  const { truck } = props;

  const { selectedTruckIds, addSelectedTruckId, removeSelectedTruckId } = useTruck();

  const dispatch = useAppDispatch();
  // const { selectedTruckIds } = useAppSelector(SelectTruckMultiSelectState);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isTruckChecked());
  }, []);

  const isTruckChecked = () => (selectedTruckIds.find((x) => x === truck.id) ? true : false);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isChecked) {
      // dispatch(RemoveTruckId(truck.id));
      removeSelectedTruckId(truck.id);
    } else {
      addSelectedTruckId(truck.id);
      // dispatch(AddTruckId(truck.id));
    }
    console.log(selectedTruckIds,truck.id)
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
          <Checkbox
            edge="end"
            // checked={checked.indexOf(value) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': 'labelId' }}
            // onChange={handleOnChange}
            checked={isChecked}
          />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}
