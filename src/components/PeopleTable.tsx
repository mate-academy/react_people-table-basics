import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
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
        {peopleList.map(person => (
          <PersonLink key={person.slug} person={person} people={peopleList} />
        ))}
      </tbody>
    </table>
  );
};
