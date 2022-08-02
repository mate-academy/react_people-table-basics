import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { getFather, getMother, getPeople } from './api';
import './App.scss';
import { PeopleTable } from './components/PeopleTable';
import { Person } from './types/Person';

const App: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => peopleFromServer
        .map(person => ({
          ...person,
          mother: getMother(person.motherName),
          father: getFather(person.fatherName),
        })))
      .then(peopleFromServer => {
        setPeople([...peopleFromServer]);
      });
  }, []);

  return (
    <div className="App">
      <h1>People table</h1>

      <header>
        <nav>
          <NavLink to="/">HomePage</NavLink>
          <NavLink to="/people">PeoplePage</NavLink>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={(
            <div>Home page</div>
          )}
        />

        <Route
          path="people"
          element={(
            <>
              <div>Peope page</div>

              {people && (
                <PeopleTable people={people} />
              )}
            </>
          )}
        />

        <Route
          path=":invoiceId"
          element={(
            <div>Page not found</div>
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
