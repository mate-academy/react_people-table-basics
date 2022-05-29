import { FC, memo } from 'react';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = memo(({ people }) => (
  <table className="table is-striped">
    <thead className="people-table__head">
      <th>Name</th>
      <th>Sex</th>
      <th>Born</th>
      <th>Died</th>
      <th>Mother</th>
      <th>Father</th>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow
          key={person.slug}
          person={person}
        />
      ))}

    </tbody>
  </table>
));
