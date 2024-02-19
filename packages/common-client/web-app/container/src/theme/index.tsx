import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bbccee',
    },
    secondary: {
      main: '#9a5252',
    },
    background: {
      default: '#2e3d72',
      paper: '#a8baec'
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Шрифт по умолчанию
  },
});

export default theme;
