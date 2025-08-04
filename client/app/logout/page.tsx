"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
const Logout = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#9900ff', 
        border: '4px solid #ccc',
        maxWidth: 600,
        mx: 'auto',
        mt: 10,
        p: 4,
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mb: 6,
        }}
      >
        You've Logged Out Successfully!
      </Typography>

      <Box
        sx={{
          backgroundColor: '#d3cfd4',
          p: 3,
          border: '2px solid black',
          display: 'inline-block',
        }}
      >
        <Typography variant="h6" sx={{ color: 'white' }}>
          Click{' '}
          <Link
            href="/login"
            className='text-blue-500 hover:underline'
          >
            HERE
          </Link>{' '}
          to Sign In Again!
        </Typography>
      </Box>
    </Box>
  );
};

export default Logout;
