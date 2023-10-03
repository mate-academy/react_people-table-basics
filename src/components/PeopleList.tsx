import React from 'react';
import { Person } from '../types';
import { People } from './People';
import { THEAD_TITLES } from '../utils/constants';

type Props = {
  persons: Person[],
};

export const PeopleList: React.FC<Props> = ({ persons }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {THEAD_TITLES.map(title => (
          <th key={title}>{title}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {persons.map(person => (
        <People key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);
