import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const element = global.document.getElementById('root') as Element;
const root = createRoot(element);
root.render(<App />);
