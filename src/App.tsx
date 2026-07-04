import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types/Person';
import { PeopleTable } from './components/Loader/PeopleTable';

import './App.scss';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <p className="has-text-danger" data-cy="peopleLoadingError">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable people={people} selectedSlug={slug} />
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
              className={
                location.pathname === '/'
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
              to="/"
            >
              Home
            </Link>

            <Link
              className={
                location.pathname.startsWith('/people')
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
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
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
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
