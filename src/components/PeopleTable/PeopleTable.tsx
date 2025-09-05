import { Person } from '../../types';
import { PersonCell } from '../PersonCell';

type Props = {
  people: Person[];
};
export function PeopleTable({ people }: Props) {
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
        {people.map(person => (
          <PersonCell person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
}
