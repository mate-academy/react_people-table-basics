import { useContext } from 'react';

import { PeopleProvider } from '../../store/PeopleContext';
import { Loader } from '../Loader';

import { TableList } from '../TableList';

export const Table = () => {
  const { isLoading, errorMessage, people } = useContext(PeopleProvider);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && !errorMessage ? (
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

            {people.length ? (
              <TableList />
            ) : (
              !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )
            )}
          </table>
        )}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
