import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function GoodbyePage() {
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
          Account Deleted
        </Typography>
        
        <Typography
          variant="body1"
          className="text-gray-700 mb-4"
        >
          We're sorry to see you go. Your account has been successfully deleted.
        </Typography>

        <Typography
          variant="body2"
          className="text-gray-600 mb-8"
        >
          Thank you for using our service. We hope to see you again in the future.
        </Typography>

        <Link href="/" passHref>
          <Button
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
            Return to Home
          </Button>
        </Link>
      </Box>
    </main>
  );
}
