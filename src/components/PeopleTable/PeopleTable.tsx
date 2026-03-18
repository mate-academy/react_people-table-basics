import { usePeople } from '../../store/PeopleContext';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable = () => {
  const { people } = usePeople();

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
        {people.map((person: Person) => {
          return <PersonLink key={person.slug} person={person} />;
        })}
      </tbody>
    </table>
  );
};
