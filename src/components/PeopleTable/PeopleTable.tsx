import { FC } from 'react';
import 'bulma';
import { PersonWithParents } from '../../types/Person';
import { PersonRow } from '../PersonRow/PersonRow';

interface Props {
  people: PersonWithParents[],
}

export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <table className="table is-hoverable">
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
        {people.map(person => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
