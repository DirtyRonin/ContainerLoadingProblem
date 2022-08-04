import { Grid } from '@mui/material';
import React from 'react';

import Trucks from './dashboardTrucks';

export default function Dashboard() {
  return (
    <>
      <h1>Meet the Dashboard</h1>
      <Grid container spacing={1}>
        <Trucks />
      </Grid>
    </>
  );
}
