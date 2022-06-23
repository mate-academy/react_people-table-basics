import { Person } from '../react-app-env';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable table table-striped">
    <tr>
      <th>Name</th>
      <th>Sex</th>
      <th>Born</th>
      <th>Died</th>
      <th>Mother</th>
      <th>Father</th>
    </tr>
    <tbody>
      {people.map(person => (
        <PersonRow person={person} />
      ))}
    </tbody>
  </table>
);
