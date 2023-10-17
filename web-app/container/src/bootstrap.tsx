import React from 'react';
import { User } from '@tickers-app/common/types/User';
import { createRoot } from 'react-dom/client';
import { App } from './App';


const mount = (devRoot: HTMLElement | null, currentUser: User | null) => {
  const root = createRoot(devRoot);
  root.render(
    <App
      user={currentUser}
    />);
}

window.initWebApp = ({ currentUser }: { currentUser: User | null }) => {
  const elem = document.getElementById('root');
  mount(elem, currentUser)
}

if(window.location.host.startsWith('localhost')){
  window.initWebApp({ currentUser: { email: 'tes@gmail.com', id: "42" }});
} else {
  window?.onWebAppIsReady()
}

export { mount };

