import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../Person/PersonLink';

interface Props {
  people: Person[],
}

export const PersonList: React.FC<Props> = ({ people }) => {
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
        {people.map(person => {
          return (
            <PersonLink key={person.slug} person={person} />
          );
        })}

      </tbody>
    </table>
  );
};
