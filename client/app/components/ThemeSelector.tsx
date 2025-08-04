import React from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  Button,
} from '@mui/material';

const ThemeSelectorRadio = () => {
  const themes = [
    {
      name: 'Theme 1',
      value: 'theme1',
      color: 'bg-green-200',
    },
    {
      name: 'Theme 2',
      value: 'theme2',
      color: 'bg-pink-200', 
    },
    {
      name: 'Theme 3',
      value: 'theme3',
      color: 'bg-blue-200', 
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        p: 5,
        borderRadius: 2,
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ fontWeight: 'bold', marginBottom: 3 }}
        textAlign="center"
      >
        Select Theme
      </Typography>

      <FormControl component="form">
        <RadioGroup row name="theme-selection" 
        defaultValue={themes[0].value}
        >
          {themes.map((theme) => (
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
              className={theme.color}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                }}
              >
                <Typography 
                   sx={{ fontWeight: 'bold', color: '#333' }}
                >{theme.name}</Typography>
                </Box>
              
            </Box>
          ))}
        </RadioGroup>
      </FormControl>

      <Box
      className="flex justify-center gap-4 mt-5"
      >
        <Button
                  variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#9900ff',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#8800e0',
            },
          }}
        >SET TO DEFAULT</Button>
        <Button
                  variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#9900ff',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#8800e0',
            },
          }}
        >SAVE CHOICE</Button>
      </Box>
    </Box>
  );
};

export default ThemeSelectorRadio;
