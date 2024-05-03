import React from 'react';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { getPreparedPeople } from '../utils/getPreparedPeople';

type Props = {
  people: Person[];
};

const TABLE_HEADERS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const preparedPeople = getPreparedPeople(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_HEADERS.map(tableHeader => (
              <th key={tableHeader}>{tableHeader}</th>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => {
          return (
            <PersonItem person={person} key={person.slug} />
          );
        })}
      </tbody>
    </table>
  );
}
