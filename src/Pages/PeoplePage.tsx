import React, { useEffect, useState } from 'react';

import { getPeople } from '../api';

import { Person } from '../types';

import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updatedPeople: Person[] = people.map(person => ({
    ...person,
    mother: people.find(pers => pers.name === person.motherName),
    father: people.find(pers => pers.name === person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!error && !!people.length && (
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

              <PeopleTable people={updatedPeople} />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
