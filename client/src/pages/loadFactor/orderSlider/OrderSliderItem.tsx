import React, { useState, useEffect } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ListItem from '@mui/material/ListItem';
import { Checkbox } from '@mui/material';

import { IOrder } from '../../../interfaces';
import loadAnalyzerContext from '../contexts/LoadAnalyzerContext';
interface Props {
  order: IOrder;
}

export default function OrderSliderItem(props: Props) {
  const { order } = props;

  const { selectedOrderIds, removeOrderId, addOrderId } = loadAnalyzerContext();

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isOrderChecked());
  }, []);

  const isOrderChecked = () => (selectedOrderIds.find((x) => x === order._id) ? true : false);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isChecked) {
      removeOrderId(order._id);
    } else {
      addOrderId(order._id);
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
