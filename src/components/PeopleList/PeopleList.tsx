import React from 'react';
import { Person } from '../../types/Person';
import { PersonInfo } from '../PersonInfo/PersonInfo';

interface Props {
  people: Person[];
}

export const PeopleList: React.FC<Props> = ({ people }) => {
  const findPersonByName = (persons: Person[], name: string | null) => (
    persons.find(person => person.name === name)
  );

  return (
    <tbody>
      {people.map((person) => {
        const {
          slug,
          motherName,
          fatherName,
        } = person;
        const mother = findPersonByName(people, motherName);
        const father = findPersonByName(people, fatherName);

        const personsParents = {
          ...person,
          mother,
          father,
        };

        return (
          <PersonInfo
            person={personsParents}
            key={slug}
          />
        );
      })}
    </tbody>
  );
};
