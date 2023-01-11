import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getPeopleFromServer = async () => {
      try {
        const peopleFromServer = await getPeople();

        setIsLoading(true);
        setPeople(peopleFromServer);
      } catch {
        setIsLoading(false);
        setHasError(true);
      }
    };

    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading && !hasError && (
            <>
              {!people.length ? (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              ) : (
                <PeopleTable people={people} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
