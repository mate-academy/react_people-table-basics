import { Person } from '../types/Person';
import PersonRow from './PersonRow';
import './PeopleTable.scss';

type Props = {
  peopleList: Person[];
};

const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Sex
          </th>
          <th>
            Born
          </th>
          <th>
            Died
          </th>
          <th>
            Father
          </th>
          <th>
            Mother
          </th>
        </tr>
      </thead>
      <tbody>
        {peopleList.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
