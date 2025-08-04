"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const EditProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSave = () => {

  };

  const handleDelete = () => {

  };

  return (
    <Box
    className="border-1 border-gray-300"
      sx={{
        backgroundColor: '#f0f0f0',
        maxWidth: 600,
        mx: 'auto',
        mt: 10,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        className="text-black font-bold text-center mb-8"
      >
        EDIT YOUR PROFILE
      </Typography>

      <form className="flex flex-col gap-4 my-10">
        <TextField
          label="New Email Address"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl variant="outlined" fullWidth required>
          <InputLabel htmlFor="new-password">New Password</InputLabel>
          <OutlinedInput
            id="new-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="New Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth required>
          <InputLabel htmlFor="confirm-password">Confirm New Password</InputLabel>
          <OutlinedInput
            id="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm New Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>

      <Box className="flex justify-around gap-5">
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
          onClick={handleReset}
        >
          RESET FORM
        </Button>
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
          onClick={handleSave}
        >
          SAVE CHANGES
        </Button>
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
          onClick={handleDelete}
        >
          DELETE ACCOUNT
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfileForm;
