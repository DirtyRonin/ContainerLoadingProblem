import { Grid } from '@mui/material';
import React from 'react';

import GoodsList from './showGoodsList'

export default function GoodsSlider() {
  return (
    <>
      <Grid container spacing={1}>
        <GoodsList />
      </Grid>
    </>
  );
}
