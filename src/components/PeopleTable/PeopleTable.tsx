import React from 'react';
import { Person } from '../../types';
import { TableElement } from '../TableElement';

type Props = {
  people: Person[]
  personId: string
};

export const PeopleTable: React.FC<Props> = ({ people, personId }) => {
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
          <TableElement
            key={person.slug}
            name={person.name}
            sex={person.sex}
            born={person.born}
            died={person.died}
            mother={person.mother}
            motherName={person.motherName}
            father={person.father}
            fatherName={person.fatherName}
            slug={person.slug}
            personId={personId}
          />
        ))}
      </tbody>
    </table>
  );
};
