import './App.scss';
import { useState } from 'react';
import {
  Navigate, Route, Routes, useParams,
} from 'react-router-dom';
import { PeopleTable } from './components/Loader/PeopleTable';
import { getPeople } from './api';
import { Person } from './types';
import { MainNav } from './components/MainNav';

export const App = () => {
  const [people, setPeople] = useState<Person[]>();

  const PeoplePage = () => {
    const { slug = '' } = useParams();

    return (
      <>
        <h1 className="title">People Page</h1>

        <PeopleTable people={people} selectedName={slug} />
      </>
    );
  };

  getPeople()
    .then(setPeople)
    .catch(() => (
      <>
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      </>
    ));

  return (
    <div data-cy="app">
      <MainNav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path="/people/:slug" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
