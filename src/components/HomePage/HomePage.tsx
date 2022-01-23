import React, { useEffect } from 'react';

type Props = {
  active: () => void,
};

export const HomePage: React.FC<Props> = ({ active }) => {
  useEffect(() => {
    active();
  }, []);

  return (
    <h2>Home Page</h2>
  );
};
