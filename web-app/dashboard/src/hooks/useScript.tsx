import { useEffect, useState } from 'react';

const useScript = (url: string): boolean => {
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.onload = (): void => {
      setIsLoad(true);
    };

    document.body.appendChild(script);

    return (): void => {
      document.body.removeChild(script);
    };
  }, [url]);

  return isLoad;
};

export default useScript;
