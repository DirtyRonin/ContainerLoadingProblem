import React from 'react';
import { Grid } from '@mui/material';

import TruckSlider from './truckSlider/truckSlider';
import OrderSlider from './orderSlider/OrderSlider';
import OrderSummary from './summaryTree/summaryTree';
import { TruckProvider } from './contexts/TruckContext';

export default function LoadAnalysis() {
  return (
    <>
      <TruckProvider>
        <Grid container>
          <Grid container md={7}>
            <Grid item md={12}>
              <h5>select trucks</h5>
              <TruckSlider />
            </Grid>
            <Grid item md={12}>
              <OrderSlider />
            </Grid>
          </Grid>
          <Grid container md={5}>
            <Grid item md={12}>
              <h5>analyse auswertung</h5>
            </Grid>
            <Grid item md={12}>
              <OrderSummary />
            </Grid>
          </Grid>
        </Grid>
      </TruckProvider>
    </>
  );
}
