import React from 'react';
import Grid from '@mui/material/Grid';

import List from './dashboardTruckList';

export default function DashboardTrucks() {
  return (
    <>
      <h2>Truck Status</h2>
      <Grid container spacing={1}>
        <List />
      </Grid>
    </>
  );
}
