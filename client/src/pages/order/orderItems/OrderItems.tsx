import * as React from 'react';
import Box from '@mui/material/Box';

import GoodsSlider from './showGoods'

export default function BasicMasonry() {
  return (
    <Box sx={{ width: 500, minHeight: 393, maxHeight: 500 }}>
      <GoodsSlider />
    </Box>
  );
}
