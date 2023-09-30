"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const AppBar_1 = __importDefault(require("@mui/material/AppBar"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Stack_1 = __importDefault(require("@mui/system/Stack"));
const system_1 = require("@mui/system");
const Item = (0, system_1.styled)('div')(({ theme }) => ({
    textAlign: 'center',
    borderRadius: 4,
}));
const MarginLeft = (0, system_1.styled)('div')(({ theme }) => ({
    marginLeft: '20px'
}));
const Header = () => {
    const theme = (0, system_1.useTheme)();
    return (<AppBar_1.default position="static" elevation={0} sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.main
        }}>
      <Toolbar_1.default>
        <Typography_1.default>
          Tickers
        </Typography_1.default>
        <MarginLeft>
          <Stack_1.default direction="row" spacing={2}>
            <Item>
              <Button_1.default size={"medium"}>
                Home
              </Button_1.default>
            </Item>
            <Item>
              <Button_1.default size={"medium"}>
                Profile
              </Button_1.default>
            </Item>
            <Item>
              <Button_1.default size={"medium"}>
                Reports
              </Button_1.default>
            </Item>
          </Stack_1.default>
        </MarginLeft>
      </Toolbar_1.default>
    </AppBar_1.default>);
};
exports.Header = Header;
