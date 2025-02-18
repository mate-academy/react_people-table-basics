import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[] | [];
  isLoading: boolean;
  hasError: boolean;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  hasError,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}
        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && !isLoading && !hasError && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people.length !== 0 && (
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
              {people.map((person: Person) => {
                return <PersonLink person={person} people={people} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
