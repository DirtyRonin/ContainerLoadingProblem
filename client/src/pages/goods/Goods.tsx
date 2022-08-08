import React from 'react';
import Grid from '@mui/material/Grid';

import { GoodsList } from './GoodsList';
import { GoodsDetails } from './GoodsDetails';

export const Goods = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item spacing={2} md={7}>
          <GoodsList />
        </Grid>
        <Grid item spacing={2} md={5}>
          <GoodsDetails />
        </Grid>
      </Grid>
    </>
  );
};

export default Goods;
