import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TruckIcon from '@mui/icons-material/LocalShipping';
import ListItem from '@mui/material/ListItem';

import { ITruck } from '../../interfaces/';

interface Props {
  truck: ITruck;
}

export default function DashboardTruckListItem(props: Props) {
  const { truck } = props;

  return (
    <ListItem dense={true}>
      <ListItemIcon>
        <TruckIcon />
      </ListItemIcon>
      <ListItemText primary={truck.vehicleIdentifier} secondary={`#${truck.vehicleIdentifier}-${truck.id}`} />
    </ListItem>
  );
}
