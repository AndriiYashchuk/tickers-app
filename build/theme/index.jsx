"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@mui/material/styles");
const theme = (0, styles_1.createTheme)({
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
exports.default = theme;
