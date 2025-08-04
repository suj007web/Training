"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <Box
        sx={{
            maxWidth: 400,

            mx: 'auto',
            mt: 10,
            borderRadius: 1,
            overflow: 'hidden',
            fontFamily: 'Arial, sans-serif',
        }}
    >
      <Box
      className="border-1 border-gray-300"
        sx={{
          maxWidth: 400,
          width: '100%',
          borderRadius: 1,
          overflow: 'hidden',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ backgroundColor: '#9900ff', textAlign: 'center', p: 2 }}>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
            REGISTER ACCOUNT
          </Typography>
        </Box>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 px-6 py-6">
          <TextField
            label="Username"
            placeholder="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}

          />

          <TextField
            label="Email Address"
            placeholder="Email Address"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="register-password">Password</InputLabel>
            <OutlinedInput
              id="register-password"
              label="Password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Buttons */}
          <Box className="flex justify-between px-1">
            <Button
              variant="contained"
              onClick={handleReset}
              sx={{
                backgroundColor: '#9900ff',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px',
                width: '45%',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#7a00cc' },
              }}
            >
              Reset
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#9900ff',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px',
                width: '45%',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#7a00cc' },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterForm;
