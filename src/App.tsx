import { useEffect, useMemo, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';
import { getPeople } from './api';
import { Person } from './types';

import './App.scss';

const NotFound = () => (
  <div data-cy="notFound">
    <h1 className="title">Page not found</h1>
  </div>
);

const HomePage = () => (
  <div data-cy="homePage">
    <h1 className="title">Home Page</h1>
  </div>
);

const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(loaded => {
        if (isCancelled) {
          return;
        }

        const byName = new Map<string, Person>();

        loaded.forEach(p => byName.set(p.name, { ...p }));

        const withParents = loaded.map(p => {
          const person = byName.get(p.name)!;

          const mother = p.motherName ? byName.get(p.motherName) : undefined;
          const father = p.fatherName ? byName.get(p.fatherName) : undefined;

          return {
            ...person,
            mother,
            father,
          } as Person;
        });

        setPeople(withParents);
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }

        setHasError(true);
      })
      .finally(() => {
        if (isCancelled) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const selectedSlug = useMemo(() => slug, [slug]);

  return (
    <div data-cy="peoplePage">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={selectedSlug} />
          )}
        </div>
      </div>
    </div>
  );
};

const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
          }
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
