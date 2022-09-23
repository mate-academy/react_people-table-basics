import {
  Navigate, NavLink, Route, Routes,
} from 'react-router-dom';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import './App.scss';
import { Person } from './types/Person';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) => classNames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);

export const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState(false);

  const uploadPeople = async () => {
    try {
      const data = await getPeople();

      setPeople(data);
    } catch (err) {
      setError(true);
    }
  };

  uploadPeople();

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
            <PageNavLink to="people" text="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />

          <Route path="home" element={<Navigate to="/" replace />} />

          <Route
            path="people"
            element={(
              <div className="container">
                <h1 className="title">People Page</h1>
                {(!people && !error) && <Loader />}

                {error && (
                  <>
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>

                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  </>
                )}

                {people && (
                  <div className="block">
                    <div className="box table-container">
                      <table
                        data-cy="peopleTable"
                        className="table is-striped
                        is-hoverable is-narrow is-fullwidth"
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Born</th>
                            <th>Died</th>
                            <th>Mother</th>
                            <th>Father</th>
                          </tr>
                        </thead>

                        <tbody>
                          {people.map(person => {
                            const {
                              name,
                              sex,
                              born,
                              died,
                              motherName,
                              fatherName,
                            } = person;

                            const linkName = name
                              .toLowerCase()
                              .split(' ')
                              .join('-');

                            return (
                              <tr data-cy="person">
                                <td>
                                  <a href={`#/people/${linkName}-${born}`}>
                                    {name}
                                  </a>
                                </td>

                                <td>{sex}</td>
                                <td>{born}</td>
                                <td>{died}</td>
                                <td>{motherName || '-'}</td>
                                <td>{fatherName || '-'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          />

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </main>
    </div>
  );
};
