import { Person } from '../../types';
import { PeopleTableRow } from '../PeopleTableRow';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: Props) => {
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
            selectedSlug={selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
