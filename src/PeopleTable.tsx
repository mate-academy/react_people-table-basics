import { PersonRow } from './PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[] | undefined
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <thead>People Table</thead>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Father Name</th>
          <th>Mother Name</th>
        </tr>
        {people && people.map(person => (
          <PersonRow key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
