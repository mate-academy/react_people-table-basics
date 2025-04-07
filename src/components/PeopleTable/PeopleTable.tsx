import React from 'react';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow';

type Props = {
  people: Person[];
  activePersonSlug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, activePersonSlug }) => {
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
        {people.map((person: Person) => {
          const fatherPerson = people.find(
            father => father.name === person.fatherName,
          );
          const motherPerson = people.find(
            mother => mother.name === person.motherName,
          );

          return (
            <PersonRow
              key={person.slug}
              person={person}
              mother={motherPerson}
              father={fatherPerson}
              isActive={activePersonSlug === person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
