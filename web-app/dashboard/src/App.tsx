import React from 'react';
import Typography from '@mui/material/Typography';
import { CardComponent } from './components/Card';


const App = () => {
  return (
    <div>
      <Typography mt={2}>Dashboard</Typography>
      <CardComponent />
      <CardComponent />
      <CardComponent />
  </div>)
}


export default App;
