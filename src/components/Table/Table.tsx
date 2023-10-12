import { useContext } from 'react';

import { PeopleProvider } from '../../store/PeopleContext';
import { Loader } from '../Loader';

import { TableList } from '../TableList';

const columnsValues = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

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
                {columnsValues.map(name => (
                  <th
                    key={name}
                  >
                    {name}
                  </th>
                ))}
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
