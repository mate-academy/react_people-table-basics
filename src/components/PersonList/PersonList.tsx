import React from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type Props = {
  people: Person[];
  personSlug: string | undefined;
};

export const PersonList: React.FC<Props> = ({
  people,
  personSlug,
}) => {
  return (
    <>
      {people.map(person => {
        const isSelected = person.slug === personSlug;
        const findFather = people.find(human => (
          human.name === person.fatherName
        ));
        const findMother = people.find(human => (
          human.name === person.motherName
        ));

        return (
          <PersonInfo
            isSelected={isSelected}
            person={person}
            key={person.slug}
            father={findFather}
            mother={findMother}
          />
        );
      })}
    </>
  );
};
