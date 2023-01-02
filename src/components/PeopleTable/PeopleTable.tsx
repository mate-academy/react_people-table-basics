import { FC } from 'react';
import { Person } from '../../types/Person';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type Props = {
  people: Person[];
  selectedPerson: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedPerson }) => (
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
      {people.map((person) => (
        <PersonInfo
          key={person.slug}
          person={person}
          selectedPerson={selectedPerson}
        />
      ))}
    </tbody>
  </table>
);
