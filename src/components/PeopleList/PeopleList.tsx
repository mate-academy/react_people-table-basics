import { useState } from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

type Props = {
  people: Person[]
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState('');

  const selectedRow = (personSlag: string) => {
    setSelectedPerson(personSlag);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {people.length > 0 && (
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
      )}

      <tbody>
        {people.map(person => (
          <PersonInfo
            key={person.slug}
            person={person}
            people={people}
            selectedPerson={selectedPerson}
            selectedRow={selectedRow}
          />
        ))}
      </tbody>
    </table>
  );
};
