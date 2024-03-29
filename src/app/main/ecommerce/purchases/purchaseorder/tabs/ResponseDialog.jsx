import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const ResponseDialog = ({ openResponse, onCloseResponse }) => {

 if(openResponse.open) {
  setTimeout(() => {
    onCloseResponse()
  }, 1500)
 }

  return (
    <Box sx={{ position: 'fixed', top: '5%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
      {openResponse.open && (
        <Stack sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
          <Alert severity={openResponse.type}>
            <AlertTitle>{openResponse.title}</AlertTitle>
            {openResponse.message}
          </Alert>
        </Stack>
      )}
    </Box>
  )
}

export default ResponseDialog