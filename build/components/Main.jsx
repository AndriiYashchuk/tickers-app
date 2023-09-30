"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const react_1 = __importDefault(require("react"));
const system_1 = require("@mui/system");
const Main = ({ children }) => (<main>
    <system_1.Container maxWidth="lg">
      {children}
    </system_1.Container>
  </main>);
exports.Main = Main;
