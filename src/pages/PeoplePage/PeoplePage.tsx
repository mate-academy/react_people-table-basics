import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(res => {
        if (res.length > 0) {
          setPersons(res);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
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
              {persons.length === 0 && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
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
                    {persons.map(people => {
                      const mother = persons.find(
                        person => person.name === people.motherName,
                      );
                      const father = persons.find(
                        person => person.name === people.fatherName,
                      );

                      return (
                        <tr
                          data-cy="person"
                          key={people.name}
                          className={
                            people.slug === slug ? 'has-background-warning' : ''
                          }
                        >
                          <td>
                            <Link
                              to={`/people/${people.slug}`}
                              className={
                                people.sex === 'f' ? 'has-text-danger' : ''
                              }
                            >
                              {people.name}
                            </Link>
                          </td>

                          <td>{people.sex}</td>
                          <td>{people.born}</td>
                          <td>{people.died}</td>
                          <td>
                            {mother !== undefined ? (
                              <Link
                                to={`/people/${mother.slug}`}
                                className="has-text-danger"
                              >
                                {mother.name}
                              </Link>
                            ) : (
                              <>{people.motherName ?? '-'}</>
                            )}
                          </td>
                          <td>
                            {father !== undefined ? (
                              <Link to={`/people/${father.slug}`}>
                                {father.name}
                              </Link>
                            ) : (
                              <>{people.fatherName ?? '-'}</>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
