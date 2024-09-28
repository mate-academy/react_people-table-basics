import React from 'react';
import { PeoplePageList } from './PeoplePageList';
import { useValues } from '../PeopleContext';

export const Table: React.FC = () => {
  const { people } = useValues();

  return (
    <>
      {!people.length ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
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
            <PeoplePageList />
          </tbody>
        </table>
      )}
    </>
  );
};
