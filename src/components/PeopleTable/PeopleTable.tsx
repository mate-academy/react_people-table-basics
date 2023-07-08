import { FC } from 'react';
import { Person } from '../../types';
import { TableRow } from '../TableRow';
import { TableColumn } from '../../enums';

interface Props {
  people: Person[]
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const tableColumns = Object.keys(TableColumn);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <TableRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
