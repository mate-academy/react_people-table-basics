import { Person } from '../../types';
import { TableContent } from '../TableContent';

interface Props {
  people: Person[],
}

export const Table: React.FC<Props> = ({ people }) => {
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
          <TableContent
            key={person.slug}
            person={person}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
