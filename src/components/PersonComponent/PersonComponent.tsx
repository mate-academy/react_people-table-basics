import React, { FC } from 'react';
import { Person } from '../Person';
import { PersonType } from '../../types';

interface Props {
  people: PersonType[];
}

export const PersonComponent: FC<Props> = ({ people }) => {
  return (
    <>
      {people.map(person => (
        <Person key={person.slug} people={people} person={person} />
      ))}
    </>
  );
};
