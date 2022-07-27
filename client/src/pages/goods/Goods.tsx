import React from "react";
import Grid from "@mui/material/Grid";

import { GoodsList } from "./GoodsList";
import { GoodsDetails } from "./GoodsDetails";

export const Goods = () => {
  return (
    <>
      <Grid container spacing={2}>
        <GoodsList />
        <GoodsDetails />
      </Grid>
    </>
  );
};

export default Goods;
