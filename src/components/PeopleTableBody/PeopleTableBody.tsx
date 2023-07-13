import React from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';

type Props = {
  people: Person[],
};

export const PeopleTableBody: React.FC<Props> = ({ people }) => (
  <tbody>
    {people.map(person => (
      <PersonItem key={person.slug} person={person} />
    ))}
  </tbody>
);
