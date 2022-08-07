import * as React from 'react';
import { OrderList } from './OrderList';
import { OrderDetails } from './OrderDetails';
import CargoSlider from '../cargo/CargoList';
import CargoDetails from '../cargo/CargoDetails';
import { Grid } from '@mui/material';

export default function Order() {
  return (
    <>
      <Grid container>
        <Grid item md={12} spacing={2}>
          <OrderDetails />
        </Grid>
        <Grid container md={12} >
          <Grid item md={3}>
            <OrderList />
          </Grid>
          <Grid container md={9} spacing={2}>
            <Grid item md={6}>
              <CargoSlider />
            </Grid>
            <Grid item md={7}>
              <CargoDetails />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
