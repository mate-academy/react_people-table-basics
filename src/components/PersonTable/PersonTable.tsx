import React from 'react';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type Props = {
  people: Person[];
};

export const PersonTable: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'].map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo
            person={person}
            key={person.slug}
            selectedPersonSlug={slug}
          />
        ))}
      </tbody>
    </table>
  );
};
