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
        <Grid container md={12}>
          <Grid item md={7}>
            <OrderList />
          </Grid>

          <Grid item md={5} spacing={2}>
            <OrderDetails />
          </Grid>
        </Grid>

        <Grid container md={12}>
          <Grid item md={7}>
            <CargoSlider />
          </Grid>
          <Grid item md={5}>
            <CargoDetails />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
