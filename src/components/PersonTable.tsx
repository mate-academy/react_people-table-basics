import { Loader } from './Loader';
import { Person } from '../types/Person';
import { PersonComponent } from './PersonComponent';

export type Props = {
  peopleState: Person[],
  error: boolean,
  loading: boolean,
};

export const PersonTable: React.FC<Props> = ({
  peopleState, error, loading,
}) => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !error && peopleState.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && peopleState.length > 0 && (
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
                {peopleState.map(person => (
                  <PersonComponent
                    key={person.slug}
                    peopleState={peopleState}
                    person={person}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
