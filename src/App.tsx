import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';
import { getPeople } from './api';
import { Person } from './types/Person';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.scss';

const HomePage = () => <h1 className="title">Home Page</h1>;

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

const PeoplePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getPeople()
      .then(data => {
        if (isMounted) {
          setPeople(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsError(true);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !isError && people && people.length > 0 && (
        <PeopleTable people={people} selectedSlug={slug} />
      )}

      {!isLoading && !isError && people && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};

export const App = () => {
  const location = useLocation();

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
            <Link
              className={`navbar-item${
                location.pathname === '/' ? ' has-background-grey-lighter' : ''
              }`}
              to="/"
            >
              Home
            </Link>

            <Link
              className={`navbar-item${
                location.pathname.startsWith('/people')
                  ? ' has-background-grey-lighter'
                  : ''
              }`}
              to="/people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
