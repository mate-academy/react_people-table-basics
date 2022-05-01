import React from 'react';
import './Home.scss';

export const Home: React.FC = React.memo(() => {
  return (
    <div className="home">
      <h2 className="home__title">Home page</h2>
    </div>
  );
});
