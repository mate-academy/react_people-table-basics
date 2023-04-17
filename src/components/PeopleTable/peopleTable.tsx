import { SinglePerson } from '../SinglePerson/SinglePerson';
import { Person } from '../../types';

type Props = {
  people: Person[],
  selectedPerson: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
}) => {
  const isSelectedPerson = (person: Person) => (
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
          <SinglePerson person={person} isSelected={isSelectedPerson(person)} />
        ))}
      </tbody>
    </table>
  );
};
