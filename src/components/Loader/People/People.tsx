/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../../types';
import { getPeople } from '../../../api';
import { Link, useLocation } from 'react-router-dom';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const peopleNames = people.map(person => person.name);
  const location = useLocation();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && !loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!people.length && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && (
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
                  const isShe = person.sex === 'f';

                  return (
                    <tr
                      data-cy="person"
                      key={person.name}
                      className={
                        location.pathname ===
                        `/people/${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`
                          ? 'has-background-warning'
                          : ''
                      }
                    >
                      <td>
                        <Link
                          to={`/people/${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`}
                          className={isShe ? 'has-text-danger' : ''}
                        >
                          {person.name}
                        </Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      {person.motherName &&
                      peopleNames.includes(person.motherName) ? (
                        <td>
                          <Link
                            to={`/people/${person.motherName.toLowerCase().replaceAll(' ', '-')}-${people.find(body => body.name === person.motherName)?.born}`}
                            className="has-text-danger"
                          >
                            {person.motherName ? person.motherName : '-'}
                          </Link>
                        </td>
                      ) : (
                        <td>{person.motherName ? person.motherName : '-'}</td>
                      )}

                      {person.fatherName &&
                      peopleNames.includes(person.fatherName) ? (
                        <td>
                          <Link
                            to={`/people/${person.fatherName.toLowerCase().replaceAll(' ', '-')}-${people.find(body => body.name === person.fatherName)?.born}`}
                          >
                            {person.fatherName ? person.fatherName : '-'}
                          </Link>
                        </td>
                      ) : (
                        <td>{person.fatherName ? person.fatherName : '-'}</td>
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
