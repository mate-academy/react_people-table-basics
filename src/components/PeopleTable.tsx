import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonItem } from './PersonItem';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findPerson = (name: string | null) => {
    return people.find(person => person.name === name) || null;
  };

  const { slug: selectedSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table
  is-striped is-hoverable is-narrow is-fullwidth"
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
        {people.map(person => (
          <PersonItem
            person={person}
            key={person.slug}
            mother={findPerson(person.motherName)}
            father={findPerson(person.fatherName)}
            isSelected={person.slug === selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
