import { FC } from 'react';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const searchedPerson = (personName: string | null) => (
    people.find(person => person.name === personName) || null
  );

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
          <PersonInfo
            person={person}
            searchedPerson={searchedPerson}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
