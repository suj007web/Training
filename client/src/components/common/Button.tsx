import React from 'react';

import { Button } from '@mui/material';

interface CommonButtonProps {
  color: string;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const CommonButton = ({
  color,
  text,
  onClick,
  type = 'button',
} : CommonButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: "#" + color,
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1rem',
        borderRadius: '8px',
        textTransform: 'none',
      }}
    >
      {text}
    </Button>
  );
};

export default CommonButton;