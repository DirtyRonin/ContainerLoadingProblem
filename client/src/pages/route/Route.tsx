import React from 'react';
import Grid from '@mui/material/Grid';

import List from './RouteList';
import RouteDetails from './RouteDetails';
import TruckLoadingList from './RouteTruckloadingsList'

export default function Trucks() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item spacing={2} md={7}>
          <List />
        </Grid>
        <Grid item spacing={2} md={5}>
          <RouteDetails />
        </Grid>
      </Grid>
    </>
  );
}
