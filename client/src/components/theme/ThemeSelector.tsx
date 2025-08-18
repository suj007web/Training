import React from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  Button,
} from '@mui/material';
import { saveThemeChoice, setDefaultTheme, getCurrentTheme } from '@/src/actions/actions';
import { _fetch } from '@/src/utils/fetch';
import { backendUrl, themeMap } from '@/src/utils/config';
import { cookies } from 'next/headers';
import ThemeRadio from './ThemeRadio';
import CommonButton from '../common/Button';


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
              <ThemeRadio key={theme.value} theme={theme} />
            ))}
          </RadioGroup>
        </FormControl>

        <Box className="flex justify-center gap-4 mt-5">
            <CommonButton
              type='button'
              text="Set Default Theme"
              onClick={async () => {
              'use server';
              await setDefaultTheme(new FormData());
            }}
            color={color}
            />
            <CommonButton

              text="Save Choice"
              type="submit"
              color={color}
              />
       
        </Box>
      </form>
    </Box>
  );
};

export default ThemeSelector;
