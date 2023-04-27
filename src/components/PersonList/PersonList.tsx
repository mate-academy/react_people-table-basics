import React from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

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

        return (
          <PersonInfo
            isSelected={isSelected}
            person={person}
            key={person.slug}
          />
        );
      })}
    </>
  );
};
