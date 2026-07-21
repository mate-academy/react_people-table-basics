import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleTabs } from './PeopleTabs';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPeople()
      .then(peopleFromApi => {
        setPeople(peopleFromApi);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {people.length <= 0 && !loader ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : loader ? (
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
                <PeopleTabs people={people} />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
