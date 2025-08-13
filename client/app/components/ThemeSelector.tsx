import React from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  Button,
} from '@mui/material';
import { saveThemeChoice, setDefaultTheme, getCurrentTheme } from '../actions';
import { _fetch } from '@/fetch';
import { backendUrl, themeMap } from '@/config';
import { cookies } from 'next/headers';


export type ThemeObject = {
  name: string;
  value: string;
  color: string;
};


const ThemeSelector = async () => {
  const cookieStore = await cookies();
  const res = await _fetch<ThemeObject[]>({
    url : `${backendUrl}/theme/all`,
    headers : {
      'Authorization': `Bearer ${cookieStore.get('token')?.value || ''}`
    }
  })
  console.log(`${backendUrl}/theme/all ` +res.data)
  const themes : ThemeObject[] = res.data || [];



  const currentTheme = await getCurrentTheme();

    const themeName = cookieStore.get('selectedTheme')?.value || 'theme1';
    const color = themeMap[themeName];
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

      <form action={saveThemeChoice}>
        <FormControl component="div">
          <RadioGroup 
            key={currentTheme} // Add key to force re-render when theme changes
            row 
            name="theme-selection" 
            defaultValue={currentTheme}
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
            ))}
          </RadioGroup>
        </FormControl>

        <Box className="flex justify-center gap-4 mt-5">
          <Button
            onClick={async () => {
              'use server';
              await setDefaultTheme(new FormData());
            }}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#"+color,
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: '8px',
              textTransform: 'none',
           
            }}
          >
            SET TO DEFAULT
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#"+color,
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: '8px',
              textTransform: 'none',
         
            }}
          >
            SAVE CHOICE
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ThemeSelector;
