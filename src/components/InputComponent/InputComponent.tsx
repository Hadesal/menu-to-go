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
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void; // Use generic type for event
  required?: boolean;
  boxStyle?: object;
  textFieldStyle?: object;
  id: string;
  error?: boolean;
  helperText?: string;
  variant?: TextFieldVariants;
  InputPropStyle?: object;
  value?: string | number;
  placeholder?: string;
  readOnly?: boolean;
  styleInputProps?: object;
  name?: string;
  disabled?: boolean;
  MAXCHARSLENGTH?: number;
}

export default function InputComponent({
  RightIcon,
  label,
  type,
  onChange,
  onKeyDown,
  required,
  boxStyle,
  textFieldStyle,
  id,
  error,
  helperText,
  variant,
  InputPropStyle,
  value,
  placeholder,
  readOnly,
  styleInputProps,
  name,
  disabled,
  MAXCHARSLENGTH,
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
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        sx={textFieldStyle}
        id={id}
        label={label}
        margin="normal"
        type={showPassword ? "text" : type}
        required={required}
        variant={variant}
        disabled={disabled}
        slotProps={{
          input: {
            style: styleInputProps,
            sx: InputPropStyle,
            endAdornment:
              type === "password" ? endPassowrdAdorment : endAdornment,
            inputProps: {
              min: 0,
              maxLength: MAXCHARSLENGTH ? MAXCHARSLENGTH : undefined,
            },
            readOnly: readOnly,
          },
        }}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
        name={name}
      />
    </Box>
  );
}
