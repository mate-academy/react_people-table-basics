import React from 'react';

import { PersonRow } from './PersonRow';

export interface PeopleTableProps {
  people: {[key: string]: any}[],
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const columnNames = ['name', 'sex', 'born', 'died', 'mother', 'father'];

  return (
    <table className="PeopleTable table is-hoverable">
      <thead className="thead">
        <tr className="tr">
          {columnNames.map(keyWord => (
            <th
              key={keyWord}
              className="th"
            >
              {keyWord}
            </th>))}
        </tr>
      </thead>
      <tbody className="tbody">
        {people.map(person => <PersonRow key={person.name} person={person} />)}
      </tbody>
    </table>
  )
}
