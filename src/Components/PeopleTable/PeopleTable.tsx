import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table table-hover table-dark">
      <thead className="thead-dark">
        <tr className="m-2 p-4">
          <th scope="col">Name</th>
          <th scope="col">Sex</th>
          <th scope="col">Born</th>
          <th scope="col">Died</th>
          <th scope="col">Mother</th>
          <th scope="col">Father</th>
        </tr>
      </thead>
      <tbody className="table__body">
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
