import React from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';

interface Props {
  people: Person[];
  slug: string;
}
export const PeopleTable: React.FC<Props> = ({
  people,
  slug,
}) => {
  return (
    <tbody>
      {people.map(person => {
        const mother = people.find(human => (
          human.name === person.motherName)) || null;

        const father = people.find(human => (
          human.name === person.fatherName)) || null;

        return (
          <PersonItem
            person={person}
            key={person.slug}
            slugId={slug}
            mother={mother}
            father={father}
          />
        );
      })}
    </tbody>
  );
};
