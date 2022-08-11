import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getFather, getMother, getPeople } from './api';
import './App.scss';
import { Header } from './components/Header/Header';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
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
      <h1 className="title is-1">People table</h1>

      <Header />

      <Routes>
        <Route
          path="/"
          element={(
            <div className="title">Home page</div>
          )}
        />

        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="people"
          element={(
            <>
              <div className="title">Peope page</div>

              {people && (
                <PeopleTable people={people} />
              )}
            </>
          )}
        />

        <Route
          path="*"
          element={(
            <div className="title">Page not found</div>
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
