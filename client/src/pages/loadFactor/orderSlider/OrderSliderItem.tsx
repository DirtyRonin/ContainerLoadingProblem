import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextPlanIcon from '@mui/icons-material/NextPlan';

import { IOrder } from '../../../interfaces';
import { AddOrderId, RemoveOrderId, SelectOrderMultiSelectState } from '../../../store/slices/order/OrderMultiSelectSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ListItem from '@mui/material/ListItem';
import { useEffectOnce } from '../../../hooks/useEffectOnce';
import { Checkbox } from '@mui/material';

interface Props {
  order: IOrder;
}

export default function OrderSliderItem  (props: Props) {
  const { order } = props;

  const dispatch = useAppDispatch();
  const { selectedOrderIds } = useAppSelector(SelectOrderMultiSelectState);

  const [isChecked, setChecked] = useState(false);

  useEffectOnce(() => {
    setChecked(isOrderChecked());
  });

  const isOrderChecked = () => (selectedOrderIds.find((x) => x === order.id) ? true : false);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isChecked) {
      dispatch(RemoveOrderId(order.id));
    } else {
      dispatch(AddOrderId(order.id));
    }
    setChecked(!isChecked);
  };

  return (
    <ListItem dense={true}>
      <ListItemButton onClick={handleOnSelect}>
        <ListItemIcon>
          <NextPlanIcon />
        </ListItemIcon>
        <ListItemText primary={order.orderName}  />
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
};
