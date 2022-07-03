import { PersonRow } from '../PersonRow';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
      {people.map((person: Person) => <PersonRow person={person} />)}
    </table>
  );
};
