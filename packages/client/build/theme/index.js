import { createTheme } from '@mui/material/styles';
export const palette = {
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
        fontFamily: 'Arial, sans-serif',
    },
};
const theme = createTheme(palette);
export default theme;
