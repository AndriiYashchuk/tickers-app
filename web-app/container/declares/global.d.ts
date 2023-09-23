declare global {
  interface Window {
    initWebApp: (props: any) => void;
  }
}

declare module 'dashboard/DashboardApp' {
  const mount: () => void
  export { mount };
}


export {}
