import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

export default (): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
