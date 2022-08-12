import React, { useMemo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { Order } from '../../models/Order';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UpdateOrder, CreateOrder, SelectOrderState } from '../../store/slices/order/OrderSlice';
import { SelectOrderListState } from '../../store/slices/order/OrderListSlice';

export const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { loading, orders } = useAppSelector(SelectOrderState);
  const { selectedOrderId } = useAppSelector(SelectOrderListState);

  const [name, setName] = useState('');

  const memoizedSelectedOrder = useMemo(
    () => orders.find((x) => x.id === selectedOrderId) ?? Order.AsInitializeDefault('New Created Order'),
    [selectedOrderId, orders]
  );

  useEffect(() => {
    const newOrder = memoizedSelectedOrder;
    setName(newOrder.orderName);
  }, [memoizedSelectedOrder]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.value) setName(event.target.value);
  };

  const IsUpdate = (id: number) => (id < 1 ? false : true);

  const handleClickSubmit = () => {
    const newOrder = new Order(selectedOrderId, name);

    if (IsUpdate(selectedOrderId)) {
      dispatch(UpdateOrder(newOrder));
      return;
    }
    dispatch(CreateOrder(newOrder));
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          ml: 3,
          mt: 3,
          width: '25ch',
          maxHeight: 400,
          border: '1px black solid',
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField required value={name} onChange={handleChangeName} id="order_name" label="Name" placeholder="Name" variant="standard" />
        </div>
        <div>
          <LoadingButton loading={loading === 'pending'} onClick={handleClickSubmit}>
            {IsUpdate(selectedOrderId) ? 'update' : 'add'}
          </LoadingButton>
        </div>
      </Box>
    </>
  );
};
