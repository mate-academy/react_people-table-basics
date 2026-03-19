import { useEffect, useState } from 'react';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

import { getPeople } from './api';
import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';
import { Person } from './types/Person';

import './App.scss';

const Nav = () => (
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
            `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
          }
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

const HomePage = () => (
  <main className="section">
    <div className="container">
      <h1 className="title">Home Page</h1>
    </div>
  </main>
);

const NotFoundPage = () => (
  <main className="section">
    <div className="container">
      <h1 className="title">Page not found</h1>
    </div>
  </main>
);

const PeoplePage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        setPeople(data || []);
        setHasError(false);
      })
      .catch(() => {
        setPeople([]);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const selectedSlug = slug ?? '';
  const hasPeople = people.length > 0;

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {hasError && !isLoading && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading && !hasError && !hasPeople && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && !hasError && hasPeople && (
              <PeopleTable people={people} selectedSlug={selectedSlug} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export const App = () => (
  <div data-cy="app">
    <Nav />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/people/:slug" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);
