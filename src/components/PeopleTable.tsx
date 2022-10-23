import { FC } from 'react';
import { Person } from '../types';
import { PeopleItem } from './PeopleItem';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => <PeopleItem person={person} />)}
      </tbody>
    </table>
  );
};
