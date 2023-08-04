import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((value) => {
        setPeople(value);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const { slug } = useParams();

  const getMother = (person: Person) => {
    return people.find(
      parent => parent.name === person.motherName,
    );
  };

  const getFather = (person: Person) => {
    return people.find(
      parent => parent.name === person.fatherName,
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {people.length > 0 && error === false && (
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
                    {people.map(person => (
                      <tr
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': slug === person.slug,
                        })}
                      >
                        <td>
                          <Link
                            to={`../${person.slug}`}
                            className={classNames({
                              'has-text-danger': person.sex === 'f',
                            })}
                          >
                            {person.name}
                          </Link>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {getMother(person)
                            ? (
                              <Link
                                to={`../${getMother(person)?.slug}`}
                                className="has-text-danger"
                              >
                                {`${getMother(person)?.name}`}
                              </Link>
                            ) : (
                              person.motherName || '-'
                            )}
                        </td>
                        <td>
                          {getFather(person)
                            ? (
                              <Link
                                to={`../${getFather(person)?.slug}`}
                              >
                                {`${getFather(person)?.name}`}
                              </Link>
                            ) : (
                              person.fatherName || '-'
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

            </>
          )}
        </div>
      </div>
    </>
  );
};
