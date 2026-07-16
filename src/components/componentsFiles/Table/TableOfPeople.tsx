import React from 'react';
import { ListOfPeople, ListProps } from './ListOfPeople';

export const TableOfPeople: React.FC<ListProps> = ({ people }) => {
  return (
    <div className="block">
      <div className="box table-container">
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
          <ListOfPeople people={people} />
        </table>
      </div>
    </div>
  );
};
