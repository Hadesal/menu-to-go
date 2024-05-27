import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldVariants,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface InputComponentProps {
  RightIcon?: React.ElementType;
  label: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  boxStyle?: object;
  textFieldStyle?: object;
  id: string;
  error?: boolean;
  helperText?: string;
  variant?: TextFieldVariants;
}

export default function InputComponent({
  RightIcon,
  label,
  type,
  onChange,
  required,
  boxStyle,
  textFieldStyle,
  id,
  error,
  helperText,
  variant,
}: InputComponentProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const endAdornment = RightIcon ? (
    <InputAdornment position="end">
      <RightIcon />
    </InputAdornment>
  ) : null;
  const endPassowrdAdorment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box sx={boxStyle}>
      <TextField
        error={error}
        helperText={helperText}
        sx={textFieldStyle}
        id={id}
        label={label}
        margin="normal"
        type={showPassword ? "text" : type}
        required={required}
        variant={variant}
        InputProps={{
          endAdornment:
            type === "password" ? endPassowrdAdorment : endAdornment,
        }}
        onChange={onChange}
      />
    </Box>
  );
}
