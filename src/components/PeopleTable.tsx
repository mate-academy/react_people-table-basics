import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[] | [];
  isError: boolean;
  isLoading: boolean;
}

const tableParameters = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({
  people,
  isError,
  isLoading,
}) => (
  <div className="block">
    <div className="box table-container">
      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {people.length === 0 && !isLoading && !isError && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {isLoading && <Loader />}

      {!!people.length && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {tableParameters.map(param => (
                <th key={param}>{param}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {people.map(person => (
              <PersonLink people={people} person={person} key={person.slug} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
