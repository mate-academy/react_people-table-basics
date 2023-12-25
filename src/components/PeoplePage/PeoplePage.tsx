import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);
  const [errorShowing, setErrorShowing] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);

  useEffect(() => {
    setIsPeopleLoading(true);
    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setErrorShowing(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {errorShowing && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleFromServer && (
            <>
              {peopleFromServer.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={peopleFromServer} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
