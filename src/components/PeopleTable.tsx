import React, { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(receivedPeople => {
        setPeople(receivedPeople);
        setIsLoading(false);
      })
      .catch(() => setErrorMessage('Something went wrong'));
  }, []);

  return (
    <>
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !errorMessage && people.length > 0 && (
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
              {people.map(person => (
                <PersonLink key={person.born} person={person} people={people} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
