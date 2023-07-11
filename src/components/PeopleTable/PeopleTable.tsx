import { FC } from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

interface Props {
  people: Person[];
}

const tableRowNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableRowNames.map(rowName => (
            <th>{rowName}</th>
          ))}
        </tr>
      </thead>

      {people.map((person) => (
        <PersonInfo
          data-cy="person"
          key={person.slug}
          person={person}
        />
      ))}
    </table>
  );
};
