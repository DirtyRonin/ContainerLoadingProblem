import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import './App.css';

import { Trucks } from './pages/trucks/Trucks';
import { Goods } from './pages/goods/Goods';
import AppBar from './components/ui/AppBar';

export function App() {
  return (
    <>
      <CssBaseline />

      <Container maxWidth="lg">
        <AppBar />
        <Box
          sx={{
            bgcolor: '#cfe8fc',
            height: '100vh',
            border: '1px solid black',
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
