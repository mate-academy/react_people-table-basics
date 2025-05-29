import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../api';
import { Person } from '../types/Person';
//import { PeopleTable } from '../PeopleTable/PeopleTable';
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonPage as PersonLink } from './PersonPage';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setError(null);
      })
      .catch(() => setError('Failed to load people data'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="block">
        <h1 className="title">People Page</h1>

        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!isLoading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people found</p>
          )}

          {!isLoading && !error && people.length > 0 && (
            <>
              <table
                data-cy="peopleTable"
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
                  {people.map(person => (
                    <tr
                      key={person.name}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': slug === person.slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td>
                        {person.motherName ? (
                          <PersonLink
                            person={people.find(
                              p => p.name === person.motherName,
                            )}
                            nameOverride={person.motherName}
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        {person.fatherName ? (
                          <PersonLink
                            person={people.find(
                              p => p.name === person.fatherName,
                            )}
                            nameOverride={person.fatherName}
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
