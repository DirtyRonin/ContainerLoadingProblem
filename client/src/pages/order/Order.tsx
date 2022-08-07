import * as React from 'react';
import { OrderList } from './OrderList';
import { OrderDetails } from './OrderDetails';
import CargoSlider from '../cargo/CargoList'
import { Grid } from '@mui/material';

export default function Order() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <OrderList />
        </Grid>
        <Grid item md={6}>
          <OrderDetails />
        </Grid>
        <Grid item md={6}>
          <CargoSlider />
        </Grid>
        
      </Grid>
    </>
  );
}
