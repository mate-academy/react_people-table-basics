import { FC } from 'react';
import { People } from '../types/People';
import PersonRow from './PersonRow';

type Props = {
  people: People[]
};

export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <table
      className="PeopleTable table is-narrow is-fullwidth"
      style={{ borderCollapse: 'collapse' }}
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
        {people.map((person) => {
          return (
            <PersonRow
              person={person}
              key={person.born + person.died + Math.random()}
            />
          );
        })}
      </tbody>
    </table>
  );
};
