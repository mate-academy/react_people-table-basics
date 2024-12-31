import { Person } from '../../types';

import { Loader } from '../Loader';
import { PeopleTableRow } from '../PeopleTableRow';

interface TabsProps {
  people: Person[];
  isLoading: boolean;
  hasError: boolean;
}

export const PeopleTable: React.FC<TabsProps> = ({
  people,
  isLoading,
  hasError,
}) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading && <Loader />}

          {!isLoading && people.length === 0 && !hasError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && people.length !== 0 && (
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
                  <PeopleTableRow key={person.slug} person={person} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
