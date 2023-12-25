/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
        setLoading(false);
      })
      .catch((error) => {
        setErr(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {err && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !err ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
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
                      {people.map((person) => (
                        <>
                          <tr
                            key={person.name}
                            data-cy="person"
                            className={
                              location.pathname === `/people/${person.slug}`
                                ? 'has-background-warning'
                                : ''
                            }
                          >
                            <PersonLink person={person} people={people} />
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
