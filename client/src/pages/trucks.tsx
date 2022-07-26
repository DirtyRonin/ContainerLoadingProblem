import React from "react";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { TruckList } from "./TruckList";
import { TruckDetails } from "./TruckDetails";

export const Trucks = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" , border: "1px solid black"}}>
          <Grid container spacing={2}>
            <TruckList />
            <TruckDetails />
            </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Trucks;
