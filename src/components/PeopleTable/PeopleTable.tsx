import React from 'react';
import { Outlet } from 'react-router-dom';
import { Person } from '../../types';
import { PersonTr } from '../Person/PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <Outlet />
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
            <PersonTr person={person} key={person.name} />
          );
        })}
      </tbody>
    </table>
  );
};
