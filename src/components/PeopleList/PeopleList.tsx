import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonItem } from '../PersonItem';
import { COLUMN_NAMES } from '../../api';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedPersonSlug = slug || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMN_NAMES.map(name => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>

      <Outlet />
    </table>
  );
};
