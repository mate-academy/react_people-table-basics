import { PersonRow } from '../PersonRow';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow person={person} key={person.slug} />
      ))}
    </tbody>
  </table>
);
