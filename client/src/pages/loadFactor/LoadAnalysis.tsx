import React from 'react';
import { Grid } from '@mui/material';

import TruckSlider from './truckSlider/truckSlider';
import OrderSlider from './orderSlider/OrderSlider';
import RouteSlider from './routeSlider/RouteSlider';
import OrderSummary from './summaryTree/summaryTree';
import Buttons from '../../components/ui/ButtonGroup';

export default function LoadAnalysis() {
  return (
    <>
      <Grid container>
        <Grid container md={7}>
          <Grid item md={12}>
            <RouteSlider />
          </Grid>
          <Grid item md={12}>
            <TruckSlider />
          </Grid>
          <Grid item md={12}>
            <OrderSlider />
          </Grid>
        </Grid>
        <Grid container md={5}>
          <Grid item md={12}>
            <OrderSummary />
          </Grid>
          <Grid item md={12}></Grid>
        </Grid>
      </Grid>
    </>
  );
}
