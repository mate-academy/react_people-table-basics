import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedPerson } = useParams();

  const peopleWithParents: Person[] = people.map((person) => {
    const father = people.find((parent) => person.fatherName === parent.name);
    const mother = people.find((parent) => person.motherName === parent.name);

    return {
      ...person,
      father,
      mother,
    };
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
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
        {peopleWithParents.map((person) => (
          <PersonItem
            person={person}
            key={person.slug}
            selectedPerson={selectedPerson}
          />
        ))}

      </tbody>
    </table>
  );
};
