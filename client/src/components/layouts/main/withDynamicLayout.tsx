import React from 'react';
import type { ComponentType } from 'react';
import { getIsMobile } from '../../../utils/server/get-is-mobile';
import DynamicLayout from './DynamicLayout';

export const withDynamicLayout = <T extends {} = {}>(Component: ComponentType) => (props: T) => {
  const isMobile = getIsMobile();

  return (
    <DynamicLayout
      currentUser={null}
      isMobile={isMobile}
    >
      <Component {...props} />
    </DynamicLayout>
  );
};
