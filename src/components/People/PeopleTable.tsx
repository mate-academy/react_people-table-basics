import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[]
};

export const People: React.FC<Props> = ({ people }) => (
  <div className="block">
    <div className="box table-container">
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
            <PersonLink
              key={person.slug}
              person={person}
              people={people}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
