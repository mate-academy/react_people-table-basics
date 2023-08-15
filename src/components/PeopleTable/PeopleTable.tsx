import { Person } from '../../types';
import { PersonTableRaw } from '../PersonTableRaw/PersonTableRaw';

type Props = {
  people: Person[],
  selectedPersonSlug: string,
  setSelectedPersonSlug: (slug: string) => void,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  setSelectedPersonSlug,
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
          <PersonTableRaw
            key={person.slug}
            person={person}
            selectedPersonSlug={selectedPersonSlug}
            setSelectedPersonSlug={setSelectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
