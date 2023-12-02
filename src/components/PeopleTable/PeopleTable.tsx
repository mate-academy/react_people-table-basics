import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string | undefined,
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
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
          <PersonLink person={person} selectedSlug={selectedSlug} />
        ))}
      </tbody>
    </table>
  );
};
