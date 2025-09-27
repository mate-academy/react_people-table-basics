import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable = ({ peoples }: { peoples: Person[] }) => {
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
        {peoples.map(person => {
          const personWithParent = {
            ...person,
            mother: peoples.find(a => a.name === person.motherName),
            father: peoples.find(a => a.name === person.fatherName),
          };

          return <PersonLink key={person.slug} person={personWithParent} />;
        })}
      </tbody>
    </table>
  );
};
