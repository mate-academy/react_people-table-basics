import { Person } from '../../types';
import { PersonCell } from '../PersonCell';

type Props = {
  people: Person[];
  selectedPersonSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
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
          <PersonCell person={person} selectedPersonSlug={selectedPersonSlug} />
        ))}
      </tbody>
    </table>
  );
};
