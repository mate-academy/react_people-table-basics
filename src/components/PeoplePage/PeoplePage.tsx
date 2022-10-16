/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import PersonRow from '../PeopleRow';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : error
              ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )
              : people.length
                ? (
                  <table
                    data-cy="peopleTable"
                    className="
                    table is-striped
                    is-hoverable
                    is-narrow
                    is-fullwidth"
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
                        <PersonRow
                          person={person}
                          people={people}
                          key={person.slug}
                        />
                      ))}
                    </tbody>
                  </table>
                )
                : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
        </div>
      </div>
    </>
  );
};
