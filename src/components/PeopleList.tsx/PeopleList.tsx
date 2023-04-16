import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

interface Props {
  people: Person[];
}

export const PeopleList: React.FC<Props> = ({ people }) => (
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
        <PersonInfo key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);
