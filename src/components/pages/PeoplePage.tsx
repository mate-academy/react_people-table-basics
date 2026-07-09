// .. PeoplePage.tsx
import { Loader } from '../Loader';
import { useState, useEffect } from 'react';
import type { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <>
                  {people.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <>
                      {' '}
                      <table
                        data-cy="peopleTable"
                        className="table
                    is-striped is-hoverable is-narrow is-fullwidth"
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
                            const mother = people.find(
                              personItem =>
                                personItem.name === person.motherName,
                            );

                            const father = people.find(
                              personItem =>
                                personItem.name === person.fatherName,
                            );

                            return (
                              <tr
                                data-cy="person"
                                key={person.slug}
                                className={
                                  person.slug === slug
                                    ? 'has-background-warning'
                                    : ''
                                }
                              >
                                <td>
                                  <PersonLink person={person} />
                                </td>

                                <td>{person.sex}</td>
                                <td>{person.born}</td>
                                <td>{person.died}</td>
                                <td>
                                  {!person.motherName ? (
                                    '-'
                                  ) : mother ? (
                                    <PersonLink person={mother} />
                                  ) : (
                                    person.motherName
                                  )}
                                </td>
                                <td>
                                  {!person.fatherName ? (
                                    '-'
                                  ) : father ? (
                                    <PersonLink person={father} />
                                  ) : (
                                    person.fatherName
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
