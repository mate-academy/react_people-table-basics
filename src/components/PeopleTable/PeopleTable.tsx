import { PersonRow } from '../PersonRow';

type Props = {
  people: PersonWithParents[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      className="
        table
        is-fullwidth
        is-hoverable
        is-bordered"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.slug}>
            <PersonRow person={person} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
