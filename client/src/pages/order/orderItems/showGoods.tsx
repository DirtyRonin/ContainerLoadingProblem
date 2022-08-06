import { Grid } from '@mui/material';
import React from 'react';

import GoodsList from './showGoodsList'

export default function GoodsSlider() {
  return (
    <>
      <h1>Meet the Goods</h1>
      <Grid container spacing={1}>
        <GoodsList />
      </Grid>
    </>
  );
}
