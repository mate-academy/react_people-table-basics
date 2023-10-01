import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { Navigation } from './Navbar';

// export const findPersonsMotherSlug = (people, person) => {
//   return people.find(mother => mother.name === person.motherName).slug;
// };

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
