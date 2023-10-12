import { useEffect, useState } from 'react';

const useScript = (url: string) => {
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.onload = () => setIsLoad(true);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);

  return isLoad;
};

export default useScript;
