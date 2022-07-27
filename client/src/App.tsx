import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";

import { Trucks } from "./pages/trucks/Trucks";
import { Goods } from "./pages/goods/Goods";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "100vh",
            border: "1px solid black",
          }}
        >
          <Trucks />
          <Goods />
        </Box>
      </Container>
    </>
  );
}

export default App;
