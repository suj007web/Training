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
    import Link from 'next/link';

    const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => setShowPassword((prev) => !prev);

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
            LOGIN
            </Typography>
        </Box>


        <form className='flex flex-col gap-10 px-5 py-4' >
        
            <TextField
            placeholder="Username"
            variant="outlined"
            fullWidth
            label="Username"

            />

            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
                id="password"
                label="Password"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
    
            />
            </FormControl>

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
            >
            Continue
            </Button>

            <Box className="flex flex-col items-center gap-2 mt-4">
                        <Link
            href={"/forgot-password"}
                className="text-purple-500 hover:underline"
            >
            Forgot Password?
            </Link>
            <Link
                href={"/register"}
                className="text-purple-500 hover:underline"
            >
            Register New Account!
            </Link>
            </Box>
        </form>
        </Box>
    );
    };

    export default LoginForm;
