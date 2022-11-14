import { useEffect, useState } from 'react';

import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadPeople();
  });

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!isLoading && !hasError) && (
            <>
              {people.length === 0
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
                : (
                  <PeopleTable people={people} />
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
