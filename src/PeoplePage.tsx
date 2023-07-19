import React, { useState } from 'react';
import { EnumPersonType } from './types/EnumPersonType';
import { PersonLink } from './PersonLink';
import { Person } from './types';

interface PeoplePageProps {
  usersArr: Person[];
}

export const PeoplePage:React.FC<PeoplePageProps> = ({ usersArr }) => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const handlePersonClick = (personName: string | null) => {
    setSelectedPerson(personName);
  };

  const isPresentInTable = (name: string | null) => {
    return usersArr.some((person) => person.name === name);
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
        {usersArr.map((person) => (
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
                personType={EnumPersonType.name}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {/* <td>{person.motherName}</td> */}
            <td>
              <PersonLink
                person={person}
                personType={EnumPersonType.motherName}
                isPresentInTable={isPresentInTable(person.motherName)}
                handlePersonClick={handlePersonClick}
              />
            </td>
            {/* <td>{person.fatherName}</td> */}
            <td>
              <PersonLink
                person={person}
                personType={EnumPersonType.fatherName}
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
