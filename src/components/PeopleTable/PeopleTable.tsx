import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <div className="content">
    <table className="table">
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
        {people.map((person) => (
          <PersonRow
            key={person.name}
            {...person}
          />
        ))}
      </tbody>
    </table>
  </div>
);
