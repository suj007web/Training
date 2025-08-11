import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
} from '@mui/material';


interface ForgotFormProps {
  forgotAction: (formData: FormData) => Promise<void>;
}

const ForgotForm = ({ forgotAction }: ForgotFormProps) => {
  return (
    <Box
      className="border-1 border-gray-300"
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
        sx={{
          backgroundColor: '#9900ff',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
          FORGOT PASSWORD
        </Typography>
      </Box>
      
      <form action={forgotAction} className="flex flex-col gap-10 px-5 py-4">
        <TextField
          name="email"
          placeholder="Registered Email"
          variant="outlined"
          fullWidth
          label="Email"
          required
        />

        <Button
          type="submit"
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
        >
          Continue
        </Button>

    
      </form>
    </Box>
  );
};

export default ForgotForm;
