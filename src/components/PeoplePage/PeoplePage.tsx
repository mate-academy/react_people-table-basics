import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';

import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await getPeople();

        setPeople(response);
        setIsLoading(false);
      } catch {
        setError(true);
        setIsLoading(false);
      }
    })();
  }, []);
  const shouldShowLengthError = people.length === 0 && !error;
  const shouldRenderPeople = !isLoading && !error && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {shouldShowLengthError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {shouldRenderPeople && <PersonLink people={people} />}
            </>
          )}
        </div>
      </div>
    </>
  );
};
