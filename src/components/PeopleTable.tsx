import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  errorMessage: string;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  errorMessage,
  isLoading,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {errorMessage === 'There are no people on the server' && (
          <p data-cy="noPeopleMessage">{errorMessage}</p>
        )}

        {errorMessage === 'Something went wrong' && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {isLoading ? (
          <Loader />
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
                <PersonLink person={person} people={people} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
