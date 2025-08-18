import { Box, Typography, Button, TextField } from '@mui/material';

import { User } from '@/src/interfaces/interfaces';

import TogglePasswordFields from '../utils/TogglePasswordFields';


export default function EditProfileForm({
  handleSave, handleDelete, userId, user,
} : {
  handleSave: (formData: FormData) => Promise<void>;
  handleDelete: (formData: FormData) => Promise<void>;
  userId: string;
  user: User;
}) {
  console.log('User data for edit:', user);

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
  EDIT {user.username.toUpperCase()} PROFILE
      </Typography>

      <form action={handleSave} className="flex flex-col gap-4 my-10">
        <input type="hidden" name="id" value={userId} />
        
        <TextField
          label="New Email Address"
          name="email"
          variant="outlined"
          fullWidth
   
        />

        <TogglePasswordFields />

        <Box className="flex justify-around gap-5 mt-6">
          <Button
            type="reset"
            fullWidth
            variant="contained"
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
            RESET FORM
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
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
            SAVE CHANGES
          </Button>
        </Box>
      </form>

      <form action={handleDelete} className="w-full mt-4">
        <input type="hidden" name="id" value={userId} />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
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
          DELETE ACCOUNT
        </Button>
      </form>
    </Box>
  );
}
