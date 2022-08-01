import PersonRow from '../PersonRow/PersonRow';
import Person from '../../types/Person';
import './PeopleTable.scss';

interface Props {
  people: Person[],
}

const PeopleTable:React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable table is-hoverable is-fullwidth">
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
          <PersonRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
