import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

interface AlertComponentProps {
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  icon?: React.ReactNode;
}

export default function AlertComponent({ message, severity = 'success', icon = <CheckIcon fontSize="inherit" /> }: AlertComponentProps) {
  return (
    <Alert icon={icon} severity={severity}>
      {message}
    </Alert>
  );
}
