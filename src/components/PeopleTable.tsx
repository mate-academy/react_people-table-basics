import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

type Props = {
  people: Person[];
};

const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => <th key={column}>{column}</th>)}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo
            key={person.slug}
            person={person}
            isSelected={slug}
          />
        ))}

      </tbody>
    </table>
  );
};
