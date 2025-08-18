import Link from "next/link";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Button, Container, Typography } from "@mui/material";

const SuccessPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Check your email
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          We've sent you a link to reset your password. Please open your email and click the link to continue.
        </Typography>
        <Button
          variant="contained"
        style={{
            backgroundColor: '#9900ff',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '8px',
            textTransform: 'none',
       
        }}
          
        >
            <Link href={"/login"}>
          Back to Login
            </Link>
        </Button>
      </Box>
    </Container>
  );
};

export default SuccessPage;
