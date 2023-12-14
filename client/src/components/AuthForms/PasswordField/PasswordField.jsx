import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({ label, error, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      size='small'
      fullWidth
      sx={{ marginTop: '10px' }}
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleTogglePassword} edge='end'>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
      error={!!error}
      helperText={error}
    />
  );
};

export default PasswordField