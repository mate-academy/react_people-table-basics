import { getPeopleWithParents } from '../../helpers';
import { Person } from '../../types';
import { PersonRow } from '../Person/PersonRow';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleWithParents = getPeopleWithParents(people);

  return (
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
            {peopleWithParents.map(person => (
              <PersonRow person={person} key={person.slug} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
