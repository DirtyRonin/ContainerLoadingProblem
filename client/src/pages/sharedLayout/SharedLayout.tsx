import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Container, CssBaseline } from '@mui/material';

import AppBar from '../../components/ui/AppBar';

export default function Home() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{heiht: '100vh'}} >
        <AppBar />
        <Box
          sx={{
            bgcolor: '#cfe8fc',
            height: 'calc(100vh - 70px)',
            border: '1px solid black',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
