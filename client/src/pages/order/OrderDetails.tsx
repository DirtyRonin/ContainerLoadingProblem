import React, { useMemo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UpdateOrder, CreateOrder, SelectOrderState } from '../../store/slices/order/OrderSlice';
import { SelectOrderListState } from '../../store/slices/order/OrderListSlice';
import { IsStringEmpty } from '../../utils/shared';
import { initializeOrder } from '../../interfaces';

export const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { loading, orders } = useAppSelector(SelectOrderState);
  const { selectedOrderId } = useAppSelector(SelectOrderListState);

  const [order, setOrder] = useState(initializeOrder());

  useEffect(() => {
    if (IsStringEmpty(selectedOrderId)) {
      setOrder(initializeOrder());
      return;
    }

    const foundOrder = orders.find((x) => x._id === selectedOrderId);
    if (foundOrder === undefined) {
      setOrder(initializeOrder());
      return;
    }

    setOrder(foundOrder);
  }, [selectedOrderId]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setOrder((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const IsUpdate = (id: string) => !IsStringEmpty(id);

  const handleClickSubmit = () => {
    if (IsUpdate(selectedOrderId)) {
      dispatch(UpdateOrder(order));
      return;
    }
    dispatch(CreateOrder(order));
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
          <TextField
            required
            name={'orderName'}
            value={order.orderName}
            onChange={handleChangeName}
            id="order_name"
            label="Name"
            placeholder="Name"
            variant="standard"
          />
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
