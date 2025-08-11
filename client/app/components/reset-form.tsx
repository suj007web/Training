import {
  Box,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import TogglePasswordFields from './TogglePasswordFields';

interface ResetFormProps {
  resetAction: (formData: FormData) => Promise<void>;
  token : string
}

const ResetPasswordForm = ({ resetAction, token }: ResetFormProps) => {
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
            RESET YOUR PASSWORD
          </Typography>
        </Box>

        <form action={resetAction} className="flex flex-col gap-8 px-6 py-6">
          <input type="hidden" name="token" value={token} />
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
export default ResetPasswordForm
