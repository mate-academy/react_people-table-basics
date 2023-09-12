import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { TablePage } from './TablePage';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              {isLoadingError ? (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              ) : (
                <>
                  {people.length > 0 ? (
                    <TablePage people={people} />
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
