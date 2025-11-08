import { Person } from '../../types';
import PersonLink from './PersonLink';

type PeopleTableProps = {
  people: Person[];
  byName: Record<string, Person>;
};

const PeopleTable: React.FC<PeopleTableProps> = ({ people, byName }) => {
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
        {people.length > 0 &&
          people.map((person: Person) => (
            <PersonLink
              person={person}
              key={person.slug}
              lookup={name => byName[name]}
            />
          ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
