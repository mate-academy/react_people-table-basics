import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow person={person} />
        ))}
      </tbody>
    </table>
  );
};
