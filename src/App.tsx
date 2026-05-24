import { useEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom';

import { getPeople } from './api';
import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable';
import { Person } from './types/Person';

import './App.scss';

const Navbar = () => (
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
            `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
          }
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

const HomePage = () => <h1 className="title">Home Page</h1>;

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPeople = async () => {
      setLoading(true);
      setHasError(false);

      try {
        const loadedPeople = await getPeople();

        if (isMounted) {
          setPeople(loadedPeople);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
          setPeople([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPeople();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !hasError && people.length > 0 && (
        <div className="block">
          <div className="box table-container">
            <PeopleTable people={people} selectedSlug={slug} />
          </div>
        </div>
      )}
    </>
  );
};

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
