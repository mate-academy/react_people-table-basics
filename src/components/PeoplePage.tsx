import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [isLoadedError, setIsLoadedError] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setIsPeopleLoading(false);
    } catch {
      setIsLoadedError(true);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {isLoadedError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {(people.length === 0 && !isPeopleLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          <PeopleTable isPeopleLoading={isPeopleLoading} people={people} />
        </div>
      </div>
    </>
  );
};
