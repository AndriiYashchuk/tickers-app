import React from 'react';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/FactCheck';

interface Props {
  text: string
}

export const CenteredTextWithIcon = ({ text }: Props) => {
  return (
    <div style={{ display: 'flex' }}>
      <Typography variant="body1" sx={{ textAlign: 'center', m: 1 }}>
        {text}
      </Typography>
      <CheckIcon color="success" fontSize="large" />
    </div>
  );
};
