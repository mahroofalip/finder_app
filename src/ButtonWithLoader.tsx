import React from 'react';
import Button from '@mui/material/Button'; 

interface ButtonWithLoaderProps {
  loading: boolean;
  onClick?: () => void; 
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained'; 
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  sx?: any; 
}

const ButtonWithLoader = ({ loading, onClick, children, variant = "contained", fullWidth = false, type = "button", sx }: ButtonWithLoaderProps) => {
  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      className="button"
      type={type}
      onClick={onClick}
      disabled={loading}
      sx={sx} 
    >
      {loading ? <span style={{marginRight:"5px"}}>Loading...</span>:""}
      {loading ? (
        <div className="loader"></div>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
};

export default ButtonWithLoader;
