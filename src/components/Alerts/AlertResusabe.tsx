import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AlertColor } from '@mui/material/Alert';

interface BasicAlertsProps {
  severity?: AlertColor;
  message: string;
}

export default function AlertResusabe({ severity = "error", message }: BasicAlertsProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={severity}>{message}</Alert>
    </Stack>
  );
}
