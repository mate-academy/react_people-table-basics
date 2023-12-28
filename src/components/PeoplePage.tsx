import React, { useState, useEffect } from 'react';
import { Person } from '../types';
import { getFullInfo } from '../helpers/getFullInfo';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { LoadingError } from './LoadingError';
import { NotFoundPeopleOnServer } from './NotFoundPeopleOnServer';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => setPeople(getFullInfo(peopleFromServer)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {hasError ? (
        <LoadingError />
      ) : (
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
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
                {!people.length ? (
                  <NotFoundPeopleOnServer />
                ) : (
                  people.map((person) => <PersonLink person={person} />)
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};
