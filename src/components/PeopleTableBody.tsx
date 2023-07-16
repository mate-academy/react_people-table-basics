import { FC } from 'react';
import { Person } from '../types';
import { PeopleTableRow } from './PeopleTableRow';

interface PeopleTableBodyProps {
  people: Person [],
}

export const PeopleTableBody
: FC<PeopleTableBodyProps> = ({ people }) => {
  const peopleWithParents = people.map(person => {
    const mother = people
      .find(p => person.motherName?.includes(p.name));
    const father = people
      .find(p => person.fatherName?.includes(p.name));

    return ({
      ...person,
      mother,
      father,
    });
  });

  return (
    <tbody>
      {peopleWithParents.map(person => (
        <PeopleTableRow key={person.slug} person={person} />
      ))}
    </tbody>
  );
};
