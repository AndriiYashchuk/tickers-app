import React from 'react';
import dynamic from 'next/dynamic';
import { StaticLayout } from './StaticLayout';
import { getCurrentUser } from '../../../utils/get-current-user';
import { getIsMobile } from '../../../utils/server/get-is-mobile';

export default function Layout(Component: any) {
  return async () => {
    const currentUser = await getCurrentUser();
    const isMobile = getIsMobile();

    const MainLayoutDynamic = dynamic(() => import('./DynamicLayout'), {
      ssr: false, // This component won't be rendered on the server
      loading: () => (
        <StaticLayout isMobile={isMobile}>
          <Component />
        </StaticLayout>)
    });

    return (
      <MainLayoutDynamic
        currentUser={currentUser}
        isMobile={isMobile}
      >
        <Component />
      </MainLayoutDynamic>
    );
  };
}
