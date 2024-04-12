import { Loader } from './Loader';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

export const People = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { personSlug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {people && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!errorMessage && people && people.length > 0 && (
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
                {people &&
                  people.map(person => {
                    const moth = people.find(
                      pers => pers.name === person.motherName,
                    );

                    const fath = people.find(
                      pers => pers.name === person.fatherName,
                    );

                    const normalizedPerson = { ...person, moth, fath };

                    const {
                      name,
                      sex,
                      born,
                      died,
                      motherName,
                      fatherName,
                      slug,
                    } = normalizedPerson;

                    return (
                      <tr
                        data-cy="person"
                        key={slug}
                        className={classNames({
                          'has-background-warning': slug === personSlug,
                        })}
                      >
                        <td>
                          <Link
                            to={`../people/${slug}`}
                            className={classNames({
                              'has-text-danger': sex === 'f',
                            })}
                          >
                            {name}
                          </Link>
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <td>
                          {motherName ? (
                            <PersonLink
                              person={normalizedPerson.moth}
                              personName={motherName}
                            />
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          {fatherName ? (
                            <PersonLink
                              person={normalizedPerson.fath}
                              personName={fatherName}
                            />
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
