import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const normalizedPeople = people
    .map(person => ({
      ...person,
      mother: people.find(p => p.name === person.motherName),
      father: people.find(p => p.name === person.fatherName),
    }));

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
        {normalizedPeople
          .map(person => (<PersonLink person={person} key={person.slug} />))}
      </tbody>
    </table>
  );
};
