import { PeopleInfo } from './PeopleInfo';
import { Person } from '../types/Person';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable table table-striped">
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
      <PeopleInfo people={people} />
    </tbody>
  </table>
);
