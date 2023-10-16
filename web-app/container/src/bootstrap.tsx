import React from 'react';
import { User } from '@tickers-app/common/types/User';
import { createRoot } from 'react-dom/client';
import { App } from './App';


const mount = (devRoot: HTMLElement | null, currentUser: User | null, pushToPath: (path: string) => void) => {
  const root = createRoot(devRoot);
  root.render(
    <App
      pushToPath={pushToPath}
      user={currentUser}
    />);
}


// @ts-ignore // TODO: add d.ts declaration
window.initWebApp = ({ currentUser }: { currentUser: User | Null }, pushToPath) => {
  const elem = document.getElementById('root');
  mount(elem, currentUser, pushToPath)
}

if(window.location.host.startsWith('localhost')){
  // @ts-ignore // TODO: add d.ts declaration
  window.initWebApp({ currentUser: { email: 'tes@gmail.com', id: "42" }}, console.log);
} else {
  // @ts-ignore // TODO: add d.ts declaration
  window?.onWebAppIsReady()
}

export { mount };

