import React, { useState, useEffect } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ListItem from '@mui/material/ListItem';
import { Checkbox } from '@mui/material';

import { addOrderId, removeOrderId, SelectLoadAnalyzerState } from '../slice/LoadAnalyzerSlice';
import { IOrder } from '../../../interfaces';
import { useAppDispatch,useAppSelector } from '../../../store';
interface Props {
  order: IOrder;
}

export default function OrderSliderItem({order}: Props) {
  const dispatch = useAppDispatch();
  const { selectedOrderIds } = useAppSelector(SelectLoadAnalyzerState);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isOrderChecked());
  }, [selectedOrderIds]);

  const isOrderChecked = () => (selectedOrderIds.find((x) => x === order._id) ? true : false);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isChecked) {
      dispatch(removeOrderId(order._id));
    } else {
      dispatch(addOrderId(order._id));
    }

    setChecked(!isChecked);
  };

  return (
    <ListItem dense={true}>
      <ListItemButton onClick={handleOnSelect}>
        <ListItemIcon>
          <NextPlanIcon />
        </ListItemIcon>
        <ListItemText primary={order.orderName} />
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
