import { v4 as uuidv4 } from 'uuid';
import { Person } from '../types';
import { FC } from 'react';
import React from 'react';

import { useParams } from 'react-router-dom';
import { PersonRow } from './PersonRow';

type Props = {
  persons: Person[];
};

export const PeopleTable: FC<Props> = ({ persons }) => {
  const { slug } = useParams();
  const tableTitles = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableTitles.map(title => (
            <th key={uuidv4()}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {persons.map(person => (
          <PersonRow
            person={person}
            slug={slug}
            persons={persons}
            key={uuidv4()}
          />
        ))}
      </tbody>
    </table>
  );
};
