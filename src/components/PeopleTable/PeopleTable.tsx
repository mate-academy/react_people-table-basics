import { FC } from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => (
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
          person={person}
          key={person.slug}
          mother={person.mother}
          father={person.father}
          motherName={person.motherName}
          fatherName={person.fatherName}
        />
      ))}
    </tbody>
  </table>
);
