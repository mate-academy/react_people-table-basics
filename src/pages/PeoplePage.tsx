import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { getParentInfo } from '../helpers';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(people => setPeopleFromServer(people))
      .catch(() => setError(true))
      .finally(() => setIsLoading(true));
  }, []);

  const isErrCatched = isLoading && error;
  const isNoPeopleOnServer = isLoading
    && !error
    && peopleFromServer.length === 0;
  const isTableVisible = isLoading && !error && peopleFromServer.length > 0;
  const visiblePeople = getParentInfo(peopleFromServer);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!isLoading && <Loader />}
          {isErrCatched && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isTableVisible && (
            <PeopleTable
              people={visiblePeople}
            />
          )}
        </div>
      </div>
    </>
  );
};
