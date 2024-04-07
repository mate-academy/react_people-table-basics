import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findParent = (parentName: string | null) => {
    if (parentName) {
      return people.find(p => p.name === parentName);
    } else {
      return undefined;
    }
  };

  const preparedPeople = people.map(person => {
    return {
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
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
        {preparedPeople.map(person => (
          <PersonLink key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};
