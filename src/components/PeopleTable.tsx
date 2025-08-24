import { Person } from '../types';
import { PeopleTableRow } from './PeopleTableRow';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const byName = (name?: string | null) => people.find(p => p.name === name);

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

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
          <PeopleTableRow
            key={person.slug}
            person={person}
            isSelected={person.slug === selectedSlug}
            mother={byName(person.motherName || undefined)}
            father={byName(person.fatherName || undefined)}
          />
        ))}
      </tbody>
    </table>
  );
};
