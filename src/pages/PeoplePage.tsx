import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import * as postService from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // #region loadPersons
  const loadPeople = useCallback(() => {
    setLoading(true);
    setError(false);

    return postService
      .getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);
  // #endregion

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <PeopleTable people={people} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
