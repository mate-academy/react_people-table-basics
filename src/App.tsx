import { useEffect, useState } from 'react';
import './App.scss';
import { getPeople } from './api';
import { Person } from './types';
import { Navigation } from './components/Navigation/Navigation';
import { Root } from './Root';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  });

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Root people={people} setPeople={setPeople} />
        </div>
      </main>
    </div>
  );
};
