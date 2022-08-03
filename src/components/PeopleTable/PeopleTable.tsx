import { PersonInterface } from '../../react-app-env';
import { TableHeader } from '../TableHeader/TableHeader';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: PersonInterface[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="table">
    <TableHeader />

    <tbody>
      {people.map(person => (
        <tr key={person.name} className="person">
          <PersonRow person={person} />
        </tr>
      ))}
    </tbody>
  </table>
);
