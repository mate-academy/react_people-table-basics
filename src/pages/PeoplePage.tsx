import { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(peopleList => setPeople(peopleList))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {(people && people.length) && <PeopleTable people={people} />}

          {(people && !people.length) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
