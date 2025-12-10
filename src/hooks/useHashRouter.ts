import { useState, useEffect } from 'react';

export const useHashRouter = (): string => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.slice(1) || '/';

    return hash === '/home' ? '/' : hash;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';

      if (hash === '/home') {
        window.location.hash = '#/';

        return;
      }

      setCurrentPath(hash);
    };

    if (window.location.hash === '#/home') {
      window.location.replace('#/');

      return;
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return currentPath;
};
