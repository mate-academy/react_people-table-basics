import { FC } from 'react';
import { PeopleType } from '../../Type/People';
import { Person } from '../Person';

type Props = {
  people: PeopleType[];
};

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
        {people.map((person) => (
          <Person key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
