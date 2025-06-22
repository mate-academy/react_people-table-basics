import { Person } from '../Person';
import { Person as PersonType } from '../../types';

interface PeopleProps {
  people: PersonType[];
  selectedPersonSlug: string | null;
}

export const People: React.FC<PeopleProps> = ({
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
          <Person
            key={person.slug}
            person={person}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
