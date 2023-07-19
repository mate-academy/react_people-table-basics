import React from 'react';

import { Person } from '../types/Person';
import { PersonItem } from './PersonItem';

type Props = {
  people: Person[],
  slug: string,
};

export const TablePeople: React.FC<Props> = ({ people, slug }) => {
  const isSelected = (person: Person) => person.slug === slug;

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
        {people.map(person => (
          <PersonItem
            key={person.slug}
            isSelected={isSelected}
            person={person}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
