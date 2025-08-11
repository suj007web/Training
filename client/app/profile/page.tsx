import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <main className="min-h-screen p-10">
      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          maxWidth: 600,
          mx: 'auto',
          mt: 10,
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          className="text-black font-bold mb-6"
        >
          Profile Updated Successfully!
        </Typography>
        
        <Typography
          variant="body1"
          className="text-gray-700 mb-8"
        >
          Your profile changes have been saved.
        </Typography>

        <Link href="/edit" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#9900ff',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: '8px',
              textTransform: 'none',
              mr: 2,
              '&:hover': {
                backgroundColor: '#8800e0',
              },
            }}
          >
            Edit Profile Again
          </Button>
        </Link>

        <Link href="/" passHref>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#9900ff',
              color: '#9900ff',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#8800e0',
                color: '#8800e0',
              },
            }}
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </main>
  );
}
