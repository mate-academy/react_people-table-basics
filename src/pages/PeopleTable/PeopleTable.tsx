import { PersonPage } from '../PersonPage';
import { Person } from '../../types';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
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
          <PersonPage
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
