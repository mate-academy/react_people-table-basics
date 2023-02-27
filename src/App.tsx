import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types/Person';
import { TablePage } from './Pages/TablePage';
import { PageNavLink } from './Pages/PageNavLink';
import { HomePage } from './Pages/HomePage';

export const App: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setIsError(false);

    getPeople()
      .then(setPeopleList)
      .then(() => setIsloading(false))
      .catch(() => setIsError(true));
  }, []);

  const filteredPeopleList = [...peopleList].map(person => {
    const motherLink = peopleList
      .find(mother => mother.name === person.motherName);
    const fatherLink = peopleList
      .find(father => father.name === person.fatherName);

    return { ...person, mother: motherLink, father: fatherLink };
  });

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <PageNavLink to="/" text="Home" />
            <PageNavLink to="/people" text="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route path="people">
            <Route
              index
              element={(
                <TablePage
                  isLoading={isLoading}
                  isError={isError}
                  filteredPeopleList={filteredPeopleList}
                />
              )}
            />
            <Route
              path=":personSlug"
              element={(
                <TablePage
                  isLoading={isLoading}
                  isError={isError}
                  filteredPeopleList={filteredPeopleList}
                />
              )}
            />
          </Route>

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </main>
    </div>
  );
};
