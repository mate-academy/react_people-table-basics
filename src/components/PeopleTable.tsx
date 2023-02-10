import { FC } from 'react';
import { Person } from '../types';
import { PersonDetails } from './PersonDetails';

type Props = {
  people: Person[];
  selectedPerson: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedPerson }) => {
  const isSelected = (person: Person) => person.slug === selectedPerson;

  const personParent = (personParentName: string | null) => {
    return people.find((person) => person.name === personParentName);
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
        {people.map((person) => (
          <PersonDetails
            key={person.name}
            person={person}
            personMother={personParent(person.motherName)}
            personFather={personParent(person.fatherName)}
            isSelected={isSelected}
          />
        ))}
      </tbody>
    </table>
  );
};
