import React from 'react';
import './PeopleTable.scss';
import { PersonRow } from './PersonRow/PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="
    PeopleTable
    table
    is-bordered
    is-striped
    is-narrow
    is-hoverable
    is-fullwidth
   "
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
          <PersonRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
