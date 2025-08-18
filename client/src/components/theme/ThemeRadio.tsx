import React from 'react'

import {
  Box,
  Typography,
  Radio,

} from '@mui/material';
import { ThemeObject } from './ThemeSelector';

const ThemeRadio = ({theme} : {
    theme : ThemeObject
}) => {
  return (
    <>
           <Box
                key={theme.value}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  mx: 2,
                }}
              >
                <Radio value={theme.value} />
                <Box
     
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    backgroundColor: theme.color,
                  }}
                >
                  <Typography 
                    sx={{ fontWeight: 'bold', color: '#333' }}
                  >
                    {theme.name}
                  </Typography>
                </Box>
              </Box>
    </>
  )
}

export default ThemeRadio
