import { Person } from '../types';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => (
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
        <PersonRow key={person.slug} people={people} person={person} />
      ))}
    </tbody>
  </table>
);
