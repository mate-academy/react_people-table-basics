import React from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

interface PeopleTableProps {
  persons: Person[] | null;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  persons,
}) => {
  return (
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
        {persons?.map(p => {
          return (
            <PersonLink
              key={p.slug}
              person={p}
              people={persons}

            />
          );
        })}
      </tbody>
    </table>
  );
};
