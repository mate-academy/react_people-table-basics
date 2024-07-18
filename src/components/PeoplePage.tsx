import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoadError, setPeopleLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { personSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setPeopleLoadError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {peopleLoadError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {peopleLoadError}
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && !isLoading && (
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
                {people.map(
                  ({ name, sex, born, died, motherName, fatherName, slug }) => {
                    const mother = people.find(
                      person => person.name === motherName,
                    );
                    const father = people.find(
                      person => person.name === fatherName,
                    );

                    return (
                      <tr
                        data-cy="person"
                        key={slug}
                        className={cn({
                          'has-background-warning': slug === personSlug,
                        })}
                      >
                        <td>
                          <Link
                            to={slug}
                            className={cn({ 'has-text-danger': sex === 'f' })}
                          >
                            {name}
                          </Link>
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>

                        <td>
                          {mother ? (
                            <Link
                              className={cn({ 'has-text-danger': motherName })}
                              to={mother.slug}
                            >
                              {motherName}
                            </Link>
                          ) : (
                            <p>{motherName || '-'}</p>
                          )}
                        </td>

                        <td>
                          {father ? (
                            <Link to={father.slug}>{fatherName}</Link>
                          ) : (
                            <p>{fatherName || '-'}</p>
                          )}
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
