import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const { slug } = useParams();

  const namesList = useMemo(
    () => people.map(person => person.name),
    [people],
  );

  const getSelectedPersonSlug = (choosedPerson: string) => {
    return people.find(person => person.name === choosedPerson)?.slug;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && !errorMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
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
                {people.map(person => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug: personSlug,
                  } = person;

                  return (
                    <tr
                      key={personSlug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': personSlug === slug,
                      })}
                    >
                      <td>
                        <Link
                          relative="path"
                          to={`../${personSlug}`}
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

                      {motherName
                        && namesList.includes(motherName)
                        ? (
                          <td>
                            <Link
                              to={`../${getSelectedPersonSlug(motherName)}`}
                              className="has-text-danger"
                            >
                              {motherName}
                            </Link>
                          </td>
                        ) : (
                          <td>{motherName || '-'}</td>
                        )}

                      {fatherName
                        && namesList.includes(fatherName)
                        ? (
                          <td>
                            <Link
                              to={`../${getSelectedPersonSlug(fatherName)}`}
                            >
                              {fatherName}
                            </Link>
                          </td>
                        ) : (
                          <td>{fatherName || '-'}</td>
                        )}
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
