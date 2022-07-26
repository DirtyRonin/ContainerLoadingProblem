import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";

import { Trucks } from "./pages/trucks";

export function App() {
  return (
    <>
      <CssBaseline />
      <Trucks />
    </>
  );
}

export default App;
