import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';


// create root
window.initWebApp = (props: any): void => {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <App
      user={'andrew'}
    />);
}
