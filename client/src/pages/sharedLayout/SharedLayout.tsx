import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Container, CssBaseline } from '@mui/material';

import AppBar from '../../components/ui/AppBar';

export default function Home() {
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
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
