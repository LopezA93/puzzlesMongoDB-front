import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './style/circular.scss'
export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex'}} justifyContent={'center'}   >
      <CircularProgress color='secondary' className='circular' />
    </Box>
  );
}
