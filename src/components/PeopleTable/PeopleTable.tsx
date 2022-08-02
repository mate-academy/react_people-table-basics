import { PersonInterface } from '../../react-app-env';
import { TableHeader } from '../TableHeader/TableHeader';
import { Person } from '../Person/Person';

type Props = {
  people: PersonInterface[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="table">
    <TableHeader />

    <tbody>
      {people.map(person => (
        <tr key={person.name} className="person">
          <Person person={person} />
        </tr>
      ))}
    </tbody>
  </table>
);
