import React from 'react';
import { PersonItem } from '../PersonItem/PersonItem';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

const COLUMNS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(columnName => (
            <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return <PersonItem person={person} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
