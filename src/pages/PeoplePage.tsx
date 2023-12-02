import { useContext } from 'react';
import { PeopleList } from '../components/PeopleList/PeopleList';
import { PeopleContext } from '../PeopleContext';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const { isLoading, error, people } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {isLoading && !error ? <Loader /> : (
            <>
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

                <PeopleList />
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};
