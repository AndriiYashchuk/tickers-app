"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const react_1 = __importDefault(require("react"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const system_1 = require("@mui/system");
const FooterWrapper = (0, system_1.styled)('footer')(({ theme }) => ({
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    textAlign: 'center',
    padding: '1rem'
}));
const Footer = () => (<FooterWrapper>
      <Typography_1.default variant="body2">
        © 2023 Andrii Yashchuk.
      </Typography_1.default>
  </FooterWrapper>);
exports.Footer = Footer;
