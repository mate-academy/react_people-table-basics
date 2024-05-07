import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/peopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [renderTable, setRenderTable] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    getPeople()
      .then(peops => {
        setPeople(peops);
        setFetchError(false);

        if (peops.length > 0) {
          setRenderTable(true);
        }
      })
      .catch(() => setFetchError(true))
      .finally(() => setShowLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {showLoader && <Loader />}

          {fetchError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {renderTable && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {renderTable && people.length > 0 && (
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
                <PeopleTable people={people} />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
