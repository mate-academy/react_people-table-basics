import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import 'bulma/css/bulma.min.css';

import { Header } from './Components/Header';
import { PeopleTable } from './Components/PeopleTable';
import { getPeople } from './api/api';
import { Person } from './Types/Person';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <div className="App">
      <div className="container is-max-desktop">
        <Header />
        <Routes>
          <Route
            path="/"
            element={(
              <h1 className="title has-text-centered notification is-primary">
                Home Page
              </h1>
            )}
          />

          <Route
            path="people"
            element={(
              <div>
                <h1 className="title has-text-centered notification is-primary">
                  People Table
                </h1>
                <PeopleTable people={people} />
              </div>
            )}
          />

          <Route
            path="*"
            element={(
              <h1 className="title has-text-centered notification is-danger">
                Page Not Found
              </h1>
            )}
          />

          <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};
