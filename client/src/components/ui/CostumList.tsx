import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

type ListItemProps = {
  orientation: 'vertical' | 'horizontal';
  children: React.ReactNode;
};

export default function CustomList({ children, orientation }: ListItemProps) {
  const currentTheme = orientation === 'horizontal' ? theme.horizontalTheme : theme.verticalTheme;

  return (
    <Box sx={currentTheme.Box}>
      <List component="nav" aria-label="main mailbox folders" sx={currentTheme.List}>
        {children}
      </List>
    </Box>
  );
}

const theme = {
  verticalTheme: {
    Box: {
      width: '90%',
      // maxWidth: 360,
      maxHeight: 400,
      bgcolor: 'background.paper',
      ml: 3,
      mt: 3,
      border: '1px solid black',
    },
    List: {
      // maxWidth: 360,
      bgcolor: 'background.paper',
      position: 'relative',
      overflow: 'auto',
      maxHeight: 200,
      '& ul': { padding: 0 },
    },
  },
  horizontalTheme: {
    Box: {
      width: '70%',
      // maxWidth: 360,
      maxHeight: 120,
      bgcolor: 'background.paper',
      ml: 3,
      mt: 3,
      border: '1px solid black',
    },
    List: {
      display: 'flex',
      flexDirection: 'row',
      // width: '100%',
      bgcolor: 'background.paper',
      position: 'relative',
      overflow: 'auto',
      // maxHeight: 175,
      '& ul': { padding: 0 },
    },
  },
};
