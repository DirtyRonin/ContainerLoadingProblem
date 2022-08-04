import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

type ListItemProps = {
  children: React.ReactNode;
};

export default function CostumList({ children }: ListItemProps) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        maxHeight: 400,
        bgcolor: 'background.paper',
        ml: 3,
        mt: 3,
        border: '1px solid black',
      }}
    >
      <List
        component="nav"
        aria-label="main mailbox folders"
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 400,
          '& ul': { padding: 0 },
        }}
      >
        {children}
      </List>
    </Box>
  );
}
