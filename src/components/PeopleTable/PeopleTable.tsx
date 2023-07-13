import { FC } from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

const tableHeaders = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

interface Props {
  people: Person[]
}
export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
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
