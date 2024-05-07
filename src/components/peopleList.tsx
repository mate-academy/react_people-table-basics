import React from 'react';
import { Person } from '../types';
import { OnePerson } from './onePerson';

interface PeopleListProps {
  people: Person[];
}

export const PeopleList: React.FC<PeopleListProps> = ({ people }) => {
  return (
    <>
      {people.map(person => {
        <OnePerson key={person.name} person={person} />;
      })}
    </>
  );
};
