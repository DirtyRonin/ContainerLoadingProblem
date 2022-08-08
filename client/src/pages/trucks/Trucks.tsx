import React from 'react';
import Grid from '@mui/material/Grid';

import TruckList from './TruckList';
import TruckDetails from './TruckDetails';

export default function Trucks() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item spacing={2} md={7}>
          <TruckList />
        </Grid>
        <Grid item spacing={2} md={5}>
          <TruckDetails />
        </Grid>
      </Grid>
    </>
  );
}
