import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <>
      {!people.length ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
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
              <PersonLink person={person} key={person.slug} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
