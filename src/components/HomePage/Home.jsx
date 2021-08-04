import React from 'react';

function Home() {
  return (
    <h1
      className="home__title"
    >
      Home Page
    </h1>
  );
}

export const HomePage = React.memo(Home);
