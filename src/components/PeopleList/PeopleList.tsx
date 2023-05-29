import React from 'react';
import { Person } from '../../types/Person';
import { PersonInfo } from '../PersonInfo/PersonInfo';

interface Props {
  people: Person[];
}

export const PeopleList: React.FC<Props> = ({ people }) => {
  const findParent = (persons: Person[], name: string | null) => (
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
        const mother = findParent(people, motherName);
        const father = findParent(people, fatherName);

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
