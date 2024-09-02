import { Person } from '../../types';
import { getPreparedPerson } from '../../utils/getPreparedPeople';
import { TablePerson } from '../TablePerson';

type Props = {
  people: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const preparedPeople = getPreparedPerson(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
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
        {preparedPeople.map(person => (
          <TablePerson person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
