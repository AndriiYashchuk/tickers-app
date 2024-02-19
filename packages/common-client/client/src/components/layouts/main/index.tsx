import React from 'react';
import dynamic from 'next/dynamic';
import { StaticLayout } from './StaticLayout';
import { getCurrentUser } from '../../../utils/get-current-user';

export default function Layout(Component: any) {
  const MainLayoutDynamic = dynamic(() => import('./DynamicLayout'), {
    ssr: false, // This component won't be rendered on the server
    loading: () => (
      <StaticLayout>
        <Component />
      </StaticLayout>)
  });

  return async () => {
    const currentUser = await getCurrentUser();

    return (
      <MainLayoutDynamic currentUser={currentUser}>
        <Component />
      </MainLayoutDynamic>
    );
  };
}
