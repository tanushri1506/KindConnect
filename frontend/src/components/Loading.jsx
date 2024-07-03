import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/system';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
}));

const Loading = () => {
  return (
    <StyledBackdrop open={true}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh" /* Adjust height as needed */
      >
        <CircularProgress color="inherit" />
        <h2 style={{ marginTop: '20px', color: 'inherit' }}>Loading...</h2>
      </Box>
    </StyledBackdrop>
  );
};

export default Loading;
