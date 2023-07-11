import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const getPersonByName = (name: string | null): Person | null => (name
    ? people.find(person => person.name === name) || null
    : null
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
          <PersonInfo
            key={person.slug}
            person={person}
            mother={getPersonByName(person.motherName)}
            father={getPersonByName(person.fatherName)}
          />
        ))}
      </tbody>
    </table>
  );
};
