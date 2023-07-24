import React, { useState } from 'react';
import { EnumPersonType } from './types/EnumPersonType';
import { PersonLink } from './PersonLink';
import { Person } from './types';

interface PeoplePageProps {
  people: Person[];
}

export const PeoplePage:React.FC<PeoplePageProps> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const handlePersonClick = (personName: string | null) => {
    setSelectedPerson(personName);
  };

  const isPresentInTable = (name: string | null) => {
    return people.some((person) => person.name === name);
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
          <tr
            data-cy="person"
            key={person.name}
            className={selectedPerson === person.name
              ? 'has-background-warning'
              : ''}
          >

            <td>
              <PersonLink
                person={person}
                handlePersonClick={handlePersonClick}
                personType={EnumPersonType.Name}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={person}
                personType={EnumPersonType.MotherName}
                isPresentInTable={isPresentInTable(person.motherName)}
                handlePersonClick={handlePersonClick}
              />
            </td>
            <td>
              <PersonLink
                person={person}
                personType={EnumPersonType.FatherName}
                isPresentInTable={isPresentInTable(person.fatherName)}
                handlePersonClick={handlePersonClick}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
