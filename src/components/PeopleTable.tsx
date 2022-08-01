import React, { useEffect, useState } from 'react';
import { PersonRow } from './PersonRow';

const getPeople = (): Promise<People[]> => {
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
  const [peoples, setPeoples] = useState<People[] | undefined>();
  const [peoplesError, setPeoplesrror] = useState(false);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        if ('Error' in peopleFromServer) {
          setPeoplesrror(true);

          return;
        }

        setPeoples(peopleFromServer);
      });
  }, []);

  return (
    <>
      {!peoples && !peoplesError && (
        <div className="Loader">
          <div className="Loader__content" />
        </div>
      )}

      {!peoples && peoplesError && (
        <div className="subtitle is-4 is- m-5">
          Peoples not found
        </div>
      )}

      {peoples && !peoplesError && (
        <table
          className="PeopleTable table is-bordered ml-3"
        >
          <thead className="table table-head">
            <tr>
              <th>Name</th>
              <td>Sex</td>
              <td>Born</td>
              <td>Died</td>
              <td>Mother</td>
              <td>Father</td>
            </tr>
          </thead>
          <tbody>
            {peoples.map(person => (
              <PersonRow person={person} key={person.slug} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
