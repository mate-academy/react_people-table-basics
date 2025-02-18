import React from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';
import { getParent } from '../../services/getParent';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
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
      {people.map(person => (
        <PersonInfo
          person={person}
          key={person.slug}
          mother={getParent(people, person.motherName)}
          father={getParent(people, person.fatherName)}
        />
      ))}
    </tbody>
  </table>
);
