import { FunctionComponent } from 'react';
import { NavBar } from '../NavBar';
import { AppRouter } from '../../Router';

export const PeopleTableApp: FunctionComponent = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <AppRouter />
      </div>
    </main>
  </div>
);
