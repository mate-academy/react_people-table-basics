import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  const peopleNames = useMemo(() => people
    .map(person => person.name), [people]);

  const getSelectedPersonSlug = (selectedPerson: string) => {
    return people.find(person => person.name === selectedPerson)?.slug;
  };

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && (
            <Loader />
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !loading && !errorMessage && (
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
                        && peopleNames.includes(motherName)
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
                        && peopleNames.includes(fatherName)
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
