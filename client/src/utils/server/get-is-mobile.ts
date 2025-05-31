import { headers } from 'next/headers';

export const getIsMobile = () => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  return /mobile/i.test(userAgent);
};
