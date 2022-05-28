import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      className="table
      is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
      {people && (people.map(person => (
        <tbody className="tbody">
          <PersonRow person={person} />
        </tbody>
      )))}
    </table>
  );
};
