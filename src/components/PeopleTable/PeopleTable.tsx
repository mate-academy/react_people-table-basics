import { Person } from '../../types';
import { PersonRow } from '../PersonRow';

type PeopleTableProps = {
  people: Person[],
  selectedPerson: string;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedPerson,
}) => {
  const isSelected = (person: Person) => (
    person.slug === selectedPerson
  );

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
        {people.map(person => (
          <PersonRow person={person} isSelected={isSelected(person)} />
        ))}
      </tbody>
    </table>
  );
};
