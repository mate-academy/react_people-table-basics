import React from 'react';
import { Person } from '../../types';
import { Table } from '../../types/Table';
import { PersonItem } from '../PersonItem/PersonItem';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(Table).map(TableElement => (
            <th key={TableElement}>{TableElement}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
