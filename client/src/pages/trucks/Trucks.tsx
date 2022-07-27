import React from "react";
import Grid from "@mui/material/Grid";

import { TruckList } from "./TruckList";
import { TruckDetails } from "./TruckDetails";

export const Trucks = () => {
  return (
    <>
      <Grid container spacing={2}>
        <TruckList />
        <TruckDetails />
      </Grid>
    </>
  );
};

export default Trucks;
