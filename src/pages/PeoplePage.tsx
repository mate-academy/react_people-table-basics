import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';

import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';

const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeoples)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError && (
                <>
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                </>
              )}

              {peoples.length > 0 && (
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
                  <tbody>
                    {peoples.map((person) => (
                      <PersonLink
                        person={person}
                        peoples={peoples}
                        key={person.name}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
