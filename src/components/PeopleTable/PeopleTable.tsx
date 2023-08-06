import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  peoples: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const findPerson = (name: string) => {
    return peoples.find((people) => people.name === name) || null;
  };

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
          <PersonLink
            key={people.slug}
            people={people}
            findPerson={findPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
