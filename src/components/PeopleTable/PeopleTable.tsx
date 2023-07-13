import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonInfo } from './PersonInfo';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();
  const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo
            key={person.slug}
            person={person}
            selectedPersonSlug={slug}
          />
        ))}
      </tbody>
    </table>
  );
};
