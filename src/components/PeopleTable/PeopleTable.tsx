import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  persons: Person[];
  selectedPerson: string | 0;
};

export const PeopleTable: React.FC<Props> = ({ persons, selectedPerson }) => {
  const findParent = (parentName: string | null) => persons.find(
    item => (item.name === parentName),
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
        {persons.map(person => (
          <PersonLink
            person={person}
            key={person.slug}
            selectedPerson={`${selectedPerson}`}
            motherInTable={findParent(person.motherName)}
            fatherInTable={findParent(person.fatherName)}
          />
        ))}
      </tbody>
    </table>
  );
};
