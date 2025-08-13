import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import TogglePasswordFields from '../utils/TogglePasswordFields';

interface RegisterFormProps {
  registerAction: (formData: FormData) => Promise<void>;

}

const RegisterForm = ({ registerAction }: RegisterFormProps) => {
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

        <form action={registerAction} className="flex flex-col gap-8 px-6 py-6">
          <TextField
            name="username"
            label="Username"
            placeholder="Username"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            name="email"
            label="Email Address"
            placeholder="Email Address"
            variant="outlined"
            fullWidth
            type="email"
            required
          />

          <TogglePasswordFields 
            showConfirmPassword={true}
            passwordLabel="Password"
            passwordName="password"
            passwordId="register-password"
            confirmPasswordLabel="Confirm Password"
            confirmPasswordName="confirmPassword"
            confirmPasswordId="confirm-register-password"
          />

         
          <Box className="flex justify-between px-1">
            <Button
             
              variant="contained"
              type='reset'
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
