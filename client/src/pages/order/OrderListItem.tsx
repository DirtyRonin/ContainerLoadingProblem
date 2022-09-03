import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import DeleteIcon from '@mui/icons-material/Delete';
import { IOrder } from '../../interfaces';

import { SelectOrderId, SelectOrderListState } from '../../store/slices/order/OrderListSlice';
import { DeleteOrder } from '../../store/slices/order/OrderSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { IsStringEmpty } from '../../utils/shared';

interface Props {
  order: IOrder;
}

export const OrderListItem = (props: Props) => {
  const { order } = props;

  const dispatch = useAppDispatch();
  const { selectedOrderId } = useAppSelector(SelectOrderListState);

  const handleOnSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(SelectOrderId(order._id));
  };

  const handleOnDelete = () => {
    dispatch(DeleteOrder(order._id));
  };

  const isSelected = () => selectedOrderId === order._id;

  return (
    <ListItem
      dense={true}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleOnDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton selected={isSelected()} onClick={handleOnSelect}>
        <ListItemIcon>
          <NextPlanIcon />
        </ListItemIcon>
        <ListItemText primary={order.orderName} secondary={order.orderName} />
      </ListItemButton>
    </ListItem>
  );
};
