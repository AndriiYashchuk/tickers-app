import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
export const FeatureCard = ({ title, description, icon: IconComponent, badgeContent, }) => (<Paper elevation={3}>
    <Box p={2}>
      {badgeContent && (<Badge badgeContent={badgeContent} color="success" anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }} overlap="circular" sx={{ position: 'relative', top: '-10px', left: '25px', width: '140px' }}>
        </Badge>)}
      <IconComponent style={{ fontSize: 100, color: '#3f51b5', display: 'block', margin: '0 auto' }}/>
      <Typography variant="h6" align="center" mt={2}>{title}</Typography>
      <Typography variant="body1" mt={1}>
        {description}
      </Typography>
    </Box>
  </Paper>);
