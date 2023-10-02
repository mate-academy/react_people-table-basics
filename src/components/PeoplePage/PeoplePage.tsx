import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [error, setError] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { personSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
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
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {(!error && !people.length && !isLoading) && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          <>

            {people.length && (
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
                  {people.map((person) => {
                    const mother = people.find(
                      ({ name }) => name === person.motherName,
                    );
                    const father = people.find(
                      ({ name }) => name === person.fatherName,
                    );

                    return (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={classNames({
                          'has-background-warning':
                            person.slug === personSlug,
                        })}
                      >
                        <td>
                          <Link
                            to={person.slug}
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

                        {mother ? (
                          <td>
                            <Link to={mother?.slug} className="has-text-danger">
                              {person.motherName}
                            </Link>
                          </td>
                        ) : (
                          <td>{person.motherName || '-'}</td>
                        )}

                        {father ? (
                          <td>
                            <Link to={father?.slug}>{person.fatherName}</Link>
                          </td>
                        ) : (
                          <td>{person.fatherName || '-'}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        </div>
      </div>
    </>
  );
};
