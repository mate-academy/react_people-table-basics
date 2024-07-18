import React, { useEffect, useState } from 'react';

import { getPeople } from '../api';

import { Person } from '../types';

import { updatePeopleWithParents } from '../servise/updatePeople';

import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleData => {
        const updatedPeople = updatePeopleWithParents(peopleData);

        setPeople(updatedPeople);
      })
      .catch(() => setError(true))
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

              <PeopleTable people={updatePeopleWithParents(people)} />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
