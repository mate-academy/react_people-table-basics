import { Person } from '../../types';
import { PersonString } from '../PersonString';

interface Props {
  people: Person[],
  personSlug: string,
}

export const PeopleTable: React.FC<Props> = ({ people, personSlug }) => (
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
        <PersonString person={person} personSlug={personSlug} />
      ))}
    </tbody>
  </table>
);
