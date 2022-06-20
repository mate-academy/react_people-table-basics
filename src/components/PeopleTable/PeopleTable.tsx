import { Person } from '../../types';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable table">
    <thead>
      <tr>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>
    <tbody>
      {people.map((el) => (
        <PersonRow person={el} />
      ))}
    </tbody>
  </table>
);
