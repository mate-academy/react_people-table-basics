import { Person } from '../types';
import { PeopleTableList } from './PeopleTableList';

export const PeopleTable = ({ people }: { people: Person[] }) => {
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
          <PeopleTableList key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
