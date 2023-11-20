import {
  Link,
  NavLink,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getPeople } from './api';
import { Person } from './types';
import { Loader } from './components/Loader';
import { AppRoutes } from './AppRoutes';

interface PersonLinkProps {
  person: Person;
  onSelect: (slug: string) => void;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, onSelect }) => {
  const handleClick = () => {
    onSelect(person.slug);
  };

  return (
    <Link
      to={`people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      onClick={handleClick}
    >
      {person.name}
    </Link>
  );
};

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage]
  = useState('');
  const [selectedPersonSlug, setSelectedPersonSlug]
  = useState<string | null>(null);

  const handleSelectPerson = (slug: string | null) => {
    setSelectedPersonSlug(slug);
  };

  useEffect(() => {
    getPeople()
      .then((data) => setPeople(data))
      .catch(() => setErrorMessage('lol'))
      .finally(() => setIsLoading(false));
  }, []);

  const getParent = (parentName: string | null) => {
    return people.find((parent) => parent.name === parentName);
  };

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
            <NavLink
              to="/"
              className={({ isActive }) => `navbar-item ${isActive ? 'navbar-item has-background-grey-lighter' : ''}`}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) => `navbar-item ${isActive ? 'navbar-item has-background-grey-lighter' : ''}`}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <AppRoutes
            people={people}
            onSelectPerson={handleSelectPerson}
            getParent={getParent}
          />
          <div className="block">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {!isLoading
              && !errorMessage
              && (!people || people.length === 0) && (
                <p
                  data-cy="noPeopleMessage"
                >
                  There are no people on the server
                </p>
              )}
              {people && people.length > 0 && (
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
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
                    {people?.map(person => (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={classNames({
                          'has-background-warning':
                          person.slug === selectedPersonSlug,
                        })}
                      >

                        <td>
                          <PersonLink
                            person={person}
                            onSelect={handleSelectPerson}
                          />
                        </td>
                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {getParent(person.motherName) ? (
                            <PersonLink
                              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                              person={getParent(person.motherName)!}
                              onSelect={handleSelectPerson}
                            />
                          ) : (
                            person.motherName || '-'
                          )}
                        </td>
                        <td>
                          {getParent(person.fatherName) ? (
                            <PersonLink
                              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                              person={getParent(person.fatherName)!}
                              onSelect={handleSelectPerson}
                            />
                          ) : (
                            person.fatherName || '-'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
