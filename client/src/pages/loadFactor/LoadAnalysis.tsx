import React from 'react';
import { Grid } from '@mui/material';

import TruckSlider from './truckSlider/truckSlider';
import OrderSlider from './orderSlider/OrderSlider';
import OrderSummary from './summaryTree/summaryTree';
import loadAnalyzerContext, { LoadAnalyzerProvider } from './contexts/LoadAnalyzerContext';

export default function LoadAnalysis() {
  return (
    <>
      <LoadAnalyzerProvider>
        <Grid container>
          <Grid container md={7}>
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
      </LoadAnalyzerProvider>
    </>
  );
}
