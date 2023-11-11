import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingHasError, setLoadingHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { personSlug = '' } = useParams();

  const isTableVisible = Boolean(people.length && !loadingHasError);
  const isTableEmpty = Boolean(
    !people.length && !loadingHasError && !isLoading,
  );

  const getPeopleFromServer = useCallback(async () => {
    setLoadingHasError(false);
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setLoadingHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadingHasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isTableEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isTableVisible && (
            <PeopleTable selectedPersonSlug={personSlug} people={people} />
          )}

        </div>
      </div>
    </div>
  );
};
