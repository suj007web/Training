'use client';

import { useState } from "react";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


interface TogglePasswordFieldsProps {
  showConfirmPassword?: boolean;
  passwordLabel?: string;
  passwordName?: string;
  passwordId?: string;
  confirmPasswordLabel?: string;
  confirmPasswordName?: string;
  confirmPasswordId?: string;
}

export default function TogglePasswordFields({ 
  showConfirmPassword = true,
  passwordLabel = "New Password",
  passwordName = "password",
  passwordId = "new-password",
  confirmPasswordLabel = "Confirm New Password",
  confirmPasswordName = "confirmPassword",
  confirmPasswordId = "confirm-password"
}: TogglePasswordFieldsProps) {
  const [showPasswordState, setShowPasswordState] = useState(false);
  const [showConfirmPasswordState, setShowConfirmPasswordState] = useState(false);

  return (
    <>
      <FormControl variant="outlined" fullWidth required>
        <InputLabel htmlFor={passwordId}>{passwordLabel}</InputLabel>
        <OutlinedInput
          id={passwordId}
          name={passwordName}
          type={showPasswordState ? 'text' : 'password'}
          label={passwordLabel}
          placeholder={passwordLabel}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPasswordState(p => !p)} edge="end">
                {showPasswordState ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {showConfirmPassword && (
        <FormControl variant="outlined" fullWidth required>
          <InputLabel htmlFor={confirmPasswordId}>{confirmPasswordLabel}</InputLabel>
          <OutlinedInput
            id={confirmPasswordId}
            name={confirmPasswordName}
            type={showConfirmPasswordState ? 'text' : 'password'}
            label={confirmPasswordLabel}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPasswordState(p => !p)} edge="end">
                  {showConfirmPasswordState ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
    </>
  );
}
