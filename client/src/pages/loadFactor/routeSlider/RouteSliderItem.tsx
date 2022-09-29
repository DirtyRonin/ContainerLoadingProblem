import React, { useState, useEffect } from 'react';
import { ListItemButton, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import NextPlanIcon from '@mui/icons-material/NextPlan';

import { IRoute } from '../../../interfaces';
import { addRouteId, clearSelectedLoadSummaryIds, removeRouteId, SelectLoadAnalyzerState } from '../slice/LoadAnalyzerSlice';
import { useAppDispatch, useAppSelector } from '../../../store';
interface Props {
  route: IRoute;
}

export default function RouteSliderItem({ route }: Props) {
  const dispatch = useAppDispatch();
  const { selectedRouteId } = useAppSelector(SelectLoadAnalyzerState);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isRouteChecked());
  }, [selectedRouteId]);

  const isRouteChecked = () => selectedRouteId === route._id;

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isChecked) {
      {
        dispatch(removeRouteId(route._id));
        dispatch(clearSelectedLoadSummaryIds());
      }
    } else {
      dispatch(addRouteId(route._id));
    }

    setChecked(!isChecked);
  };

  return (
    <ListItem dense={true}>
      <ListItemButton onClick={handleOnSelect}>
        <ListItemIcon>
          <NextPlanIcon />
        </ListItemIcon>
        <ListItemText primary={`from ${route.from} to ${route.to}`} />
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
