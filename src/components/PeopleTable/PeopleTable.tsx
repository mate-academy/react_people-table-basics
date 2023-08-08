import React, { useCallback } from 'react';
import { Person } from '../../types';
import { PersonTableRow } from '../PersonTableRow';

type Props = {
  peoples: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const findPerson = useCallback((name: string) => {
    return peoples.find((people) => people.name === name) || null;
  }, []);

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
        {peoples.map((people) => (
          <PersonTableRow
            key={people.slug}
            person={people}
            findPerson={findPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
