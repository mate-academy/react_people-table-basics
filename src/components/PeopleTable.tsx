import 'bulma/css/bulma.min.css';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
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
      {people.map(person => (
        <tr key={person.slug}>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.fatherName}</td>
          <td>{person.motherName}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
