import { FC } from 'react';

import { Person } from '../../types';

import { PersonInfo } from '../PersonInfo';

interface Props {
  people: Person[];
}

const TABLE_HEADING = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_HEADING.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
