import React, { useEffect, useState } from 'react';
import { PersonRow } from './PersonRow';

const getPeople = (): Promise<Person[]> => {
  // eslint-disable-next-line max-len
  const API_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

  return fetch(API_URL)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
};

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[] | undefined>();
  const [peopleError, setPeopleError] = useState(false);
  const isLoading = !people && !peopleError;

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        if ('Error' in peopleFromServer) {
          setPeopleError(true);

          return;
        }

        setPeople(peopleFromServer);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="Loader">
          <div className="Loader__content" />
        </div>
      )}

      {!people && peopleError && (
        <div className="subtitle is-4 is- m-5">
          Peoples not found
        </div>
      )}

      {people && !peopleError && (
        <table
          className="PeopleTable table is-bordered ml-3"
        >
          <thead className="table table-head">
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
              <PersonRow person={person} key={person.slug} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
