import { FC } from 'react';
import { Person } from '../types/Person';
import { PersonInfo } from './PersonInfo';

export interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnNames.map(columnName => (
            <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
