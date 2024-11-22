import React from 'react';
import { Person as PersonType } from '../types/Person';
import { Person } from '../components/Person';

interface Props {
  people: PersonType[];
  activePerson: PersonType | null;
  onPersonSelect: (person: PersonType) => void;
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
          <Person person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
