import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(peopleses => {
        setPeoples(peopleses);
      })
      .catch(() => setError('something'))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}
          {error === 'something' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!peoples.length &&
            !loader && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

          {/* {!peoples.length ||
            (loader && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ))} */}

          {peoples.length > 0 && (
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
                <PeopleTable peoples={peoples} />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
