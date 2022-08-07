import { Person } from '../types/Person';
import TableBody from './TableBody';

type Props = {
  people: Person[],
};

const PeopleTable:React.FC<Props> = ({ people }) => (
  <table className="table table-striped">
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
        <tr key={person.slug}>
          <TableBody person={person} />
        </tr>
      ))}
    </tbody>
  </table>
);

export default PeopleTable;
