import { Button, CircularProgress } from '@mui/material'
import React from 'react'
import { green } from '@mui/material/colors';

const SubmitButton = ({
  loading,
}) => {
  return (
    <Button disabled={loading} type='submit' variant='contained' color='primary' >
      Submit
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Button>
  )
}

export default SubmitButton