import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList/PeopleList';
import { Person } from '../types';

interface Props {
  isLoading: boolean,
  hasError: boolean,
  hasEmptyTable: boolean,
  hasVisibleTable: boolean,
  people: Person[],
}

export const PeoplePage: React.FC<Props> = ({
  isLoading,
  hasError,
  hasEmptyTable,
  hasVisibleTable,
  people,
}) => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {hasError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {hasEmptyTable ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) : ''}

          {hasVisibleTable && (
            <table
              data-cy="peopleTable"
              // eslint-disable-next-line max-len
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

              <PeopleList
                people={people}
              />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
