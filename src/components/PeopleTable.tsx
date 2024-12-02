import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

type Props = {
  people: Person[];
  selectedPerson?: Person | null;
  errorMessage: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson = null,
  errorMessage,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
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
              <PersonInfo
                person={person}
                key={person.slug}
                people={people}
                isSelected={
                  selectedPerson && selectedPerson.slug === person.slug
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
