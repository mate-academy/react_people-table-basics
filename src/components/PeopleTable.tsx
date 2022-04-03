import { People } from '../types/People';
import { PersonRow } from './PersonRow';

type Props = {
  people: People[],
  caption: string,
};

export const PeopleTable: React.FC<Props> = ({ people, caption }) => {
  return (
    <table className="PeopleTable">
      <caption className="PeopleTable-caption">{caption}</caption>
      <thead className="PeopleTable-header">
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
        {people.map(person => (
          <PersonRow person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
