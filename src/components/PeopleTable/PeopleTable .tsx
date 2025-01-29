import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink/PeopleLink';

export const PeopleTable: React.FC<{ people: Person[] }> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table
    is-striped
    is-hoverable
    is-narrow
    is-fullwidth"
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
        {people.map(person => {
          return <PeopleLink key={person.slug} {...person} />;
        })}
      </tbody>
    </table>
  );
};
