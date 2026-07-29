import { Person } from '../../types';
import { PersonTR } from '../PersonTR/PersonTR';

type Props = {
  persons: Person[];
};

export const PersonTable: React.FC<Props> = ({ persons }) => {
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
        {persons.map(person => (
          <PersonTR key={person.slug} person={person} people={persons} />
        ))}
      </tbody>
    </table>
  );
};
