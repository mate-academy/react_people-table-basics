import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people:People[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <th>name</th>
      <th>sex</th>
      <th>born</th>
      <th>died</th>
      <th>mother</th>
      <th>father</th>
      <tbody>
        {people.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
