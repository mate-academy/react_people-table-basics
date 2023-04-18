import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  peopleData: Person[],
  selectedPerson: string,
};

export const PeopleTable: React.FC<Props> = ({
  peopleData,
  selectedPerson,
}) => {
  const isSelected = (person: Person) => person.slug === selectedPerson;

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
        {peopleData.map((person) => (
          <PersonLink
            key={person.slug}
            person={person}
            isSelected={isSelected(person)}
          />
        ))}
      </tbody>
    </table>
  );
};
